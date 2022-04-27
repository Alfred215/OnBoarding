import { Component, ViewChild } from '@angular/core';
import { PlayerGridDto } from '../shared/api/models';
import { PlayerService } from '../shared/api/services';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  playerCollection: PlayerGridDto[] = [];
  name: string[] = [];
  position: string[] = [];
  num: number[]=[];
  team: string[] = [];
  activo: boolean;

  constructor(private playerSV: PlayerService) {}

  async ionViewWillEnter() {
    if(!this.activo){
      this.getList();
      this.activo= true;
    }
  }

  private getList() {
    this.playerSV.apiPlayerSelectGet$Json().subscribe(result => {
      const key = Object.values(result);
      this.playerCollection.push(key[1]);
      for(let i = 0; i<key[0];i++){
        this.name.push(this.playerCollection[0][i].name);
        this.position.push(this.playerCollection[0][i].position);
        this.team.push(this.playerCollection[0][i].Equipo.teamName);
        this.num.push(i);
      }
    });
  }

}
