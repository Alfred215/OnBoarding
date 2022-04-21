import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AxBsDatatableNewItemType, BsDatatableComponent, BsModalConfirmationMessageComponent, DtActionButton, DtActionColumnButton, DtColumnItem, FilterItem, LabelAndValueExtended, nameof } from 'ax-toolbox';
import { first } from 'rxjs/operators';
import { PlayerGridDto, PlayerGridDtoCollectionList, PlayerFilterDtoDatatableDto, PlayerDto, TeamDto,  TeamGridDto,TeamGridDtoCollectionList,TeamFilterDtoDatatableDto } from 'src/app/shared/api/models';
import { Location } from '@angular/common';
import { Roles } from 'src/app/shared/models/enums/role.enum';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { PlayerService, TeamService } from 'src/app/shared/api/services';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drags-list',
  templateUrl: './drags-list.component.html',
  styleUrls: ['./drags-list.component.scss']
})

export class DragsListComponent implements OnInit {

  dtColumns: DtColumnItem[] = [];
  dtColumnsTeam : DtColumnItem[] =[];
  dtColumnsActionButtons = [];
  public _serverSideError: any = {};
  parentUrl = this.router.url;
  _dummyNewItemType = { ...AxBsDatatableNewItemType };

  @ViewChild('dtPlayers') dtPlayers: BsDatatableComponent;
  @ViewChild('mDeleteConfirm') mDeleteConfirm: BsModalConfirmationMessageComponent;
  @ViewChild('mDownloadConfirm') mDownloadConfirm: BsModalConfirmationMessageComponent;

  _item: PlayerDto = {
    id: 0,
    name: "",
    number: 0,
    position: "",
    teamId: 0
  }

  item: TeamDto = {
    id: 0,
    name: "",
    league:"",
    active: null
  }
  
  mostrarfiltros: boolean = false;
  esNuevoItem: boolean = false;
  _isLoading: boolean = false;

  name:string;
  nameTeam:string;
  league:string;
  number: number;
  teamId: number;
  position: string;
  newId: number;
  angular: any;

  _playerIdDelete: number;
  showModal = false;
  

  constructor(
    private translateSV: TranslateService,
    private router: Router,
    private playerSV: PlayerService,
    private teamSV: TeamService,
    public aRoute: ActivatedRoute,
    private location: Location,
    private toastSV: ToastrService
  ) { }

  async ngOnInit() {
    //await this.checkRoles();
    this.initbtnPlus();
    this.initcolumns();
  }

  refreshdatatable() {
    this.dtPlayers.refreshData();
  }

  private async initbtnPlus() {
    
  }

  private async initcolumns() {
  this.dtColumns = [
    new DtColumnItem<PlayerGridDto, string>().setData({
      columnName: this.translateSV.instant('PAGES.MAIN.PLAYERS.LIST.NAME'),
      field: 'name',
      sort: true,
      filter: true
    }),
    new DtColumnItem<PlayerGridDto, number>().setData({
      columnName: this.translateSV.instant('PAGES.MAIN.PLAYERS.LIST.TEAMNAME'),
      field: 'teamName',
      sort: true,
      filter: true
    }),    
  ];

  this.dtColumnsTeam = [  
  new DtColumnItem<TeamGridDto, string>().setData({
    columnName: this.translateSV.instant('PAGES.MAIN.TEAMS.LIST.NAME'),
    field: 'name',
    sort: true,
    filter: true
  })
];
  }

  async dtGetterFn(queryParams: { [param: string]: any }, filters: FilterItem[]): Promise<PlayerGridDtoCollectionList> {

    const request: PlayerFilterDtoDatatableDto = {
      filters: {
        id: filters.find(f => f.field === nameof<PlayerGridDto>('id'))?.value as number,
        name:filters.find(f => f.field === nameof<PlayerGridDto>('name'))?.value as string,
        number:filters.find(f => f.field === nameof<PlayerGridDto>('number'))?.value as number,
        position:filters.find(f => f.field === nameof<PlayerGridDto>('position'))?.value as string,
        teamId:filters.find(f => f.field === nameof<PlayerGridDto>('teamId'))?.value as number 
      },
      pageIndex: queryParams.pi,
      pageSize: queryParams.ps,
      sortDescending: queryParams.sd,
      sortName: queryParams.sn,
    };
    const parts = await this.playerSV.apiPlayerDatatablePost$Json({ body: request })
      .pipe(first())
      .toPromise();
    return parts;
  }

  async dtGetterFnTeam(queryParams: { [param: string]: any }, filters: FilterItem[]): Promise<TeamGridDtoCollectionList> {

    const request: TeamFilterDtoDatatableDto = {
      filters: {
        id: filters.find(f => f.field === nameof<TeamGridDto>('id'))?.value as number,
        name:filters.find(f => f.field === nameof<TeamGridDto>('name'))?.value as string,
        league:filters.find(f => f.field === nameof<TeamGridDto>('league'))?.value as string,
      },
      pageIndex: queryParams.pi,
      pageSize: queryParams.ps,
      sortDescending: queryParams.sd,
      sortName: queryParams.sn,
    };
    const parts = await this.teamSV.apiTeamDatatablePost$Json({ body: request })
      .pipe(first())
      .toPromise();
    return parts;
  }

  MoviesList = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8'
  ];

  MoviesWatched = [
  ];
  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }  

  closeModal(): void {
    this.showModal = !this.showModal;
  }

  public goBack() {
  this.location.back();
  }

}

