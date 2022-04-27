import { Component, ViewChild } from '@angular/core';
import { TeamDto, TeamGridDto } from '../shared/api/models';
import { TeamService } from '../shared/api/services';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  teamCollection: TeamGridDto[] = [];
  name: string[] = [];
  league: string[] = [];
  position: number[]=[];
  activo: boolean;

  constructor(private http: HttpClient,
    private teamSV: TeamService, public loadingController: LoadingController
  ) {}

  async ionViewWillEnter() {
    if(!this.activo){
      this.getList();
      this.activo= true;
    }
  }

  private getList() {
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
