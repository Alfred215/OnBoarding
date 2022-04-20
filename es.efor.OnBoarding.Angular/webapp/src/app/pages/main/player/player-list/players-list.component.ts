import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AxBsDatatableNewItemType, BsDatatableComponent, BsModalConfirmationMessageComponent, DtActionButton, DtActionColumnButton, DtColumnItem, FilterItem, LabelAndValueExtended, nameof } from 'ax-toolbox';
import { first } from 'rxjs/operators';
import { TeamGridDto, TeamGridDtoCollectionList, TeamFilterDtoDatatableDto, PlayerDto } from 'src/app/shared/api/models';
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

  @ViewChild('dtParts') dtParts: BsDatatableComponent;
  @ViewChild('mDeleteConfirm') mDeleteConfirm: BsModalConfirmationMessageComponent;
  @ViewChild('mDownloadConfirm') mDownloadConfirm: BsModalConfirmationMessageComponent
  
  ///4149380511265175

  mostrarfiltros: boolean = false;
  esNuevoItem: boolean = false;
  _isLoading: boolean = false;
  
  //Roles
  _isAdmin: boolean = false;
  _isTutor: boolean = false;
  _canEdit: boolean = false;

  //Filtros excel
  userId: number;
  id: number;
  dateEx: string; 
  invertedHours: number;

  name: string;
  league: string;
  idDelete: number;
  newId: number;
  angular: any;

  _item: PlayerDto = {
    id: 0,
    name: "",
    number: 0,
    position: "",
    teamId: 0
  }
  

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
    this.dtParts.refreshData();
  }

  private async initbtnPlus() {
  this.dtColumnsActionButtons = []


  this.dtColumnsActionButtons = [

    new DtActionButton().setData({
      tooltip: this.translateSV.instant('ADD'),
      iconPreffix: faPlus.prefix,
      iconName: faPlus.iconName,
      btnClass: 'btn btn-sm btn-outline-secondary',
      onClick: () => {
        this.router.navigate(['parts/new']);
      }
    })
  ];

  }

  private async initcolumns() {
  this.dtColumns = [
    new DtColumnItem<TeamGridDto, string>().setData({
      thTHeadClass: 'cell-narrow',
      buttons: [
        new DtActionColumnButton<TeamGridDto, string>().setData({
          onClick: (ev: Event, dt: BsDatatableComponent<any>, item: TeamGridDto) => {
            this.router.navigate(['parts/edit', item.id]);
          },
          iconPreffix: 'fas',
          iconName: 'edit',
          //disabledItemProperty: "canWEdit" 
          tooltip: this.translateSV.instant('EDIT'),
          btnClass: 'btn btn-sm btn-warning text-white',
        }),
        new DtActionColumnButton<TeamGridDto, string>().setData({
          onClick: (ev: Event, dt: BsDatatableComponent<any>, item: TeamGridDto) => {

            this.idDelete = item.id;
            this.mDeleteConfirm.open();

          },
          iconName: 'trash',
          iconPreffix: 'fas',
          tooltip: this.translateSV.instant('DELETE'),
          btnClass: 'btn btn-sm btn-danger text-white'
        })
      ]
    }),
    new DtColumnItem<TeamGridDto, number>().setData({
      columnName: this.translateSV.instant('PAGES.MAIN.PARTS.LIST.COLUMN.ID'),
      field: 'id',
      sort: true,
      filter: true
    }),
    
    new DtColumnItem<TeamGridDto, string>().setData({
      columnName: this.translateSV.instant('PAGES.MAIN.PARTS.LIST.COLUMN.NAME'),
      field: 'name',
      sort: true,
      filter: true
    }),
    new DtColumnItem<TeamGridDto, string>().setData({
      columnName: this.translateSV.instant('PAGES.MAIN.PARTS.LIST.COLUMN.LEAGUE'),
      field: 'league',
      sort: true,
      filter: true
    })    
  ];
  }

  public goBack() {
  this.location.back();
  }

}
