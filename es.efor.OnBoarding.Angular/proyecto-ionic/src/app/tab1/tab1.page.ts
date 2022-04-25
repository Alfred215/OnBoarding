import { Component, OnInit, ViewChild  } from '@angular/core';
import { TeamDto } from '../shared/api/models';
import { TeamService } from '../shared/api/services';

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

  constructor() {}

  async ngOnInit() {

  }

}

