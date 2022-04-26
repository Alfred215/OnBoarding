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

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  data: string;
  error: string;
  loading: any;

  item: TeamDto = {
    id: 0,
    name: '',
    league: '',
    active: true
  };
  teamCollection: TeamGridDto[];

  constructor(private http: HttpClient,
    private teamSV: TeamService, public loadingController: LoadingController
  ) {
    this.data = 'Test';
    this.error = '';
  }

  async ionViewWillEnter() {
    this.getName();
  }

  private getName(){
    this.teamSV.apiTeamSelectGet$Json().subscribe(result =>{
      console.log(result);
      this.teamCollection = result;
    });
  }
}

