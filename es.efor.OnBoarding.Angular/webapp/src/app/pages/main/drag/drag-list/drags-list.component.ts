import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AxBsDatatableNewItemType, BsDatatableComponent, BsModalConfirmationMessageComponent, DtActionButton, DtActionColumnButton, DtColumnItem, FilterItem, LabelAndValueExtended, nameof } from 'ax-toolbox';
import { first } from 'rxjs/operators';
import { PlayerGridDto, PlayerGridDtoCollectionList, PlayerFilterDtoDatatableDto, PlayerDto, TeamDto, TeamGridDto, TeamGridDtoCollectionList, TeamFilterDtoDatatableDto } from 'src/app/shared/api/models';
import { Location } from '@angular/common';
import { Roles } from 'src/app/shared/models/enums/role.enum';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { PlayerService, TeamService } from 'src/app/shared/api/services';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ServerSideError } from 'src/app/shared/interceptors/api-error/api-error.interceptor';

@Component({
  selector: 'app-drags-list',
  templateUrl: './drags-list.component.html',
  styleUrls: ['./drags-list.component.scss']
})

export class DragsListComponent implements OnInit {

  dtColumns: DtColumnItem[] = [];
  dtColumnsTeam: DtColumnItem[] = [];
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
    league: "",
    active: null
  }

  mostrarfiltros: boolean = false;
  esNuevoItem: boolean = false;
  _isLoading: boolean = false;

  name: string;
  nameTeam: string;
  league: string;
  number: number;
  teamId: number;
  position: string;
  newId: number;
  angular: any;

  _playerIdDelete: number;
  showModal = false;
  teamSelected: string;
  newItemPlayer: boolean;
  editItemPlayer: boolean;
  selectedTeam: number;
  selectedPlayer: number;
  nameSelected: string;
  toastrSV: any;
  itemErrors: string[];
  idSelected: number;
  positionSelected: string;
  numberSelected: number;


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
    this.initcolumns();
    //this.ngListenerTeam
    //this.ngListenerPlayer();
  }

  /*
  public ngListenerTeam() {
    this.aRoute.paramMap.subscribe(async (data) => {
      const router = this.router.url;
      const id = Number(data.get('id'));
      //this.subordinate = false;
      if (router.match) {
        if (router.match) {
          this.newItemPlayer = true;
          this.editItemPlayer = false;
        } else {
          if (!id || this.item.id === undefined) {
            this.goBack();
            return;
          }
          this._item = await this.getPlayerByID(id);
          if (router.match) {
            this.newItemPlayer = false;
            this.editItemPlayer = true;
            this.getTeambyId();
          }
        }
      }
    });
  }
  */

  /*
  public ngListenerPlayer() {
    this.aRoute.paramMap.subscribe(async (data) => {
      const router = this.router.url;
      const id = Number(data.get('id'));
      //this.subordinate = false;
      if (router.match) {
        if (router.match) {
          this.newItemPlayer = true;
          this.editItemPlayer = false;
        } else {
          if (!id || this.item.id === undefined) {
            this.goBack();
            return;
          }
          this._item = await this.getPlayerByID(id);
          if (router.match) {
            this.newItemPlayer = false;
            this.editItemPlayer = true;
          }
        }
      }
    });
  }
  */

  async getPlayerByID(id: number): Promise<PlayerDto> {
    try {
      return await this.playerSV.apiPlayerGetGet$Json({ id }).pipe(first()).toPromise();
    } catch (error) {
      return error;
    }
  }

  async getTeambyId(): Promise<void> {
    const resp = await this.teamSV.apiTeamGetGet$Json({ id: this._item.teamId }).pipe(first()).toPromise();
    this.teamSelected = resp.name;
  }

  async getNamebyId(): Promise<void> {
    const resp = await this.playerSV.apiPlayerGetGet$Json({ id: this._item.id }).pipe(first()).toPromise();
    this.nameSelected = resp.name;
    this.numberSelected = resp.number;
    this.positionSelected = resp.position;
  }

  async acTeamFn(filter?: string): Promise<LabelAndValueExtended<number, unknown>[]> {
    const resp = await this.teamSV.apiTeamSelectPost$Json({ nombre: filter }).pipe(first()).toPromise();
    const result = resp.map(team => {
      const asLav = new LabelAndValueExtended<number>().setData({
        label: team.name,
        value: team.id,
        extraData: team
      });
      return asLav;
    });
    return result;
  }

  async acPlayerFn(filter?: string): Promise<LabelAndValueExtended<number, unknown>[]> {
    const resp = await this.playerSV.apiPlayerSelectPost$Json({ nombre: filter }).pipe(first()).toPromise();
    const result = resp.map(player => {
      const asLav = new LabelAndValueExtended<number>().setData({
        label: player.name,
        value: player.id,
        extraData: player
      });
      return asLav;
    });
    return result;
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
        name: filters.find(f => f.field === nameof<PlayerGridDto>('name'))?.value as string,
        number: filters.find(f => f.field === nameof<PlayerGridDto>('number'))?.value as number,
        position: filters.find(f => f.field === nameof<PlayerGridDto>('position'))?.value as string,
        teamId: filters.find(f => f.field === nameof<PlayerGridDto>('teamId'))?.value as number
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
        name: filters.find(f => f.field === nameof<TeamGridDto>('name'))?.value as string,
        league: filters.find(f => f.field === nameof<TeamGridDto>('league'))?.value as string,
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

  async onBtnSave(): Promise<void> {
      this._item.name = this.nameSelected;
      this._item.position = this.positionSelected;
      this._item.number = this.numberSelected;
      console.log(this._item);

      await this.playerSV.apiPlayerPost$Json({ body: this._item }).subscribe(() => {
        this.toastSV.success(
          this.translateSV.instant('SUCCESS.PLAYER.MESSAGE'),
          this.translateSV.instant('SUCCESS.PLAYER.HEADER')
        );
        this.dtPlayers.refreshData();
      }, () => {
        this.toastSV.error(
          this.translateSV.instant('API.ERROR.PLAYER.MESSAGE_ERROR'),
          this.translateSV.instant('API.ERROR.PLAYER.TITLE_ERROR'),
        );
      });
  }

  OnSelectTeam(event: number): void {
    this._item.teamId = event;
    this.selectedTeam = event;
  }
  OnSelectPlayer(event: number): void {
    this._item.id = event;
    this.getNamebyId();
    this.selectedPlayer = event;
  }

  public goBack() {
    this.location.back();
  }

}

