import { Component, OnInit, ViewChild  } from '@angular/core';
import {DtColumnItem} from 'ax-toolbox';
import { TeamGridDto, TeamGridDtoCollectionList, TeamFilterDtoDatatableDto, TeamDto } from 'src/app/api/models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  dtColumnName: DtColumnItem[] = [];

  constructor() {
  }

  async ngOnInit() {
    this.initcolumns();
  }

  private async initcolumns() {
    this.dtColumnName = [
      new DtColumnItem<TeamGridDto, string>().setData({
        field: 'name',
        sort: true,
        filter: true
      })
    ];
  }

}

