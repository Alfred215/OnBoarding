import { Component, ViewChild } from '@angular/core';
import { TeamDto, TeamGridDto } from '../shared/api/models';
import { TeamService } from '../shared/api/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { ContentType } from '@ionic/cli';
import { CorsOptions } from 'cors';
import { stringify } from 'querystring';
import { LevelTransformLogger } from '@angular-devkit/core/src/logger';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  item: TeamDto = {
    id: 0,
    name: '',
    league: '',
    active: true
  };
  teamCollection: TeamGridDto[] = [];
  name: string[] = [];
  league: string[] = [];
  position: number[]=[];

  constructor(private http: HttpClient,
    private teamSV: TeamService, public loadingController: LoadingController
  ) {}

  async ionViewWillEnter() {
    this.getName();
  }

  private getName() {
    this.teamSV.apiTeamSelectGet$Json().subscribe(result => {
      const key = Object.values(result);
      this.teamCollection.push(key[1]);
      for(let i = 0; i<key[0];i++){
        this.name.push(this.teamCollection[0][i].name);
        this.league.push(this.teamCollection[0][i].league);
        this.position.push(i);
      }
    });
  }
}
