import { Component, OnInit, ViewChild  } from '@angular/core';
import { TeamDto } from '../shared/api/models';
import { TeamService } from '../shared/api/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  item: TeamDto={
    id: 0,
    name: '',
    league: '',
    active: true
  };

  constructor(private http: HttpClient,
    private teamSV: TeamService
  ) {
  }

  async ngOnInit() {
    this.getName();
  }

  private async getName(){
    const valor = await this.teamSV.apiTeamDatatablePost$Json({}).pipe(first())
    .toPromise();
    return valor;
  }

}

