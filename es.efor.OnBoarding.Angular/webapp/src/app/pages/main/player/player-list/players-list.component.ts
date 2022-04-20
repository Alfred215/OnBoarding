import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AxBsDatatableNewItemType, BsDatatableComponent, BsModalConfirmationMessageComponent, DtActionButton, DtActionColumnButton, DtColumnItem, FilterItem, LabelAndValueExtended, nameof } from 'ax-toolbox';
import { first } from 'rxjs/operators';
import { PlayerGridDto, PlayerGridDtoCollectionList, PlayerFilterDtoDatatableDto, PlayerDto } from 'src/app/shared/api/models';
import { Location } from '@angular/common';
import { Roles } from 'src/app/shared/models/enums/role.enum';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { PlayerService, TeamService } from 'src/app/shared/api/services';


@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

  dtColumns: DtColumnItem[] = [];
  dtColumnsActionButtons = [];
  public _serverSideError: any = {};
  parentUrl = this.router.url;
  _dummyNewItemType = { ...AxBsDatatableNewItemType };

  @ViewChild('dtPlayers') dtPlayers: BsDatatableComponent;
  @ViewChild('mDeleteConfirm') mDeleteConfirm: BsModalConfirmationMessageComponent;
  @ViewChild('mDownloadConfirm') mDownloadConfirm: BsModalConfirmationMessageComponent
  
  ///4149380511265175

  

  _item: PlayerDto = {
    id: 0,
    name: "",
    number: 0,
    position: "",
    teamId: 0,
  }
  
  mostrarfiltros: boolean = false;
  esNuevoItem: boolean = false;
  _isLoading: boolean = false;
  angular: any;

  _playerIdDelete: number;
  showModal = false;
  

  constructor(
    private translateSV: TranslateService,
    private router: Router,
    private playerSV: PlayerService,
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
    this.dtColumnsActionButtons = [
      new DtActionButton().setData({
        tooltip: this.translateSV.instant('ADD'),
        iconPreffix: faPlus.prefix,
        iconName: faPlus.iconName,
        btnClass: 'btn btn-sm btn-outline-secondary',
        onClick: () => {
          this.router.navigate(['player/new']);
        }
      })
    ];
  }

  private async initcolumns() {
  this.dtColumns = [
    new DtColumnItem<PlayerGridDto, string>().setData({
      thTHeadClass: 'cell-narrow',
      buttons: [
        new DtActionColumnButton<PlayerGridDto, string>().setData({
          onClick: (ev: Event, dt: BsDatatableComponent<any>, item: PlayerGridDto) => {
            this.router.navigate(['player/edit', item.id]);
          },
          iconPreffix: 'fas',
          iconName: 'edit',
          //disabledItemProperty: "canWEdit" 
          tooltip: this.translateSV.instant('EDIT'),
          btnClass: 'btn btn-sm btn-warning text-white',
        }),
        new DtActionColumnButton<PlayerGridDto, string>().setData({
          onClick: (ev: Event, dt: BsDatatableComponent<any>, item: PlayerGridDto) => {

            this.showModal = true;
            this._playerIdDelete = item.id;

          },
          iconName: 'trash',
          iconPreffix: 'fas',
          tooltip: this.translateSV.instant('DELETE'),
          btnClass: 'btn btn-sm btn-danger text-white'
        })
      ]
    }),
    new DtColumnItem<PlayerGridDto, string>().setData({
      columnName: this.translateSV.instant('PAGES.MAIN.PLAYERS.LIST.NAME'),
      field: 'name',
      sort: true,
      filter: true
    }),
    new DtColumnItem<PlayerGridDto, number>().setData({
      columnName: this.translateSV.instant('PAGES.MAIN.PLAYERS.LIST.NUMBER'),
      field: 'number',
      sort: true,
      filter: true
    }),
    new DtColumnItem<PlayerGridDto, string>().setData({
      columnName: this.translateSV.instant('PAGES.MAIN.PLAYERS.LIST.POSITION'),
      field: 'position',
      sort: true,
      filter: true
    }),
    new DtColumnItem<PlayerGridDto, number>().setData({
      columnName: this.translateSV.instant('PAGES.MAIN.PLAYERS.LIST.TEAMID'),
      field: 'teamId',
      sort: true,
      filter: true
    }),    
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

  deletePlayer(): void {
    this.playerSV.apiPlayerDelete$Json({ Id: this._playerIdDelete })
      .subscribe(() => {
        this.toastSV.success(
          this.translateSV.instant('SUCCESS.USER.DELETE_MESSAGE'),
          this.translateSV.instant('SUCCESS.USER.DELETE_HEADER'),
        )
        this.showModal = false;
        this.dtPlayers.refreshData();
      }, () => {
        this.toastSV.error(
          this.translateSV.instant('API.ERROR.GENERIC.MESSAGE'),
          this.translateSV.instant('API.ERROR.GENERIC.TITLE'),
        );
      })
  }

  closeModal(): void {
    this.showModal = !this.showModal;
  }

  public goBack() {
  this.location.back();
  }

}
