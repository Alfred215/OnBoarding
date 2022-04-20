import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AxBsDatatableNewItemType, BsDatatableComponent, BsModalConfirmationMessageComponent, DtActionButton, DtActionColumnButton, DtColumnItem, FilterItem, LabelAndValueExtended, nameof } from 'ax-toolbox';
import { first } from 'rxjs/operators';
import { TeamGridDto, TeamGridDtoCollectionList, TeamFilterDtoDatatableDto, TeamDto } from 'src/app/shared/api/models';
import { Location } from '@angular/common';
import { Roles } from 'src/app/shared/models/enums/role.enum';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { TeamService } from 'src/app/shared/api/services';


@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.scss']
})
export class PartsListComponent implements OnInit {

  dtColumns: DtColumnItem[] = [];
  dtColumnsActionButtons = [];
  public _serverSideError: any = {};
  parentUrl = this.router.url;
  _dummyNewItemType = { ...AxBsDatatableNewItemType };

  @ViewChild('dtTeams') dtTeams: BsDatatableComponent;
  @ViewChild('mDeleteConfirm') mDeleteConfirm: BsModalConfirmationMessageComponent;
  @ViewChild('mDownloadConfirm') mDownloadConfirm: BsModalConfirmationMessageComponent

  _item: TeamDto = {
    id: 0,
    name: "",
    league: "",
    active: null
  }
  
  mostrarfiltros: boolean = false;
  esNuevoItem: boolean = false;
  _isLoading: boolean = false;

  name: string;
  league: string;
  idDelete: number;
  newId: number;
  angular: any;

  _teamIdDelete: number;
  showModal = false;

  constructor(
    private translateSV: TranslateService,
    private router: Router,
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
    this.dtTeams.refreshData();
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

            this.showModal = true;
            this._teamIdDelete = item.id;

          },
          iconName: 'trash',
          iconPreffix: 'fas',
          tooltip: this.translateSV.instant('DELETE'),
          btnClass: 'btn btn-sm btn-danger text-white'
        })
      ]
    }),
    new DtColumnItem<TeamGridDto, number>().setData({
      columnName: this.translateSV.instant('PAGES.MAIN.TEAMS.LIST.COLUMN.ID'),
      field: 'id',
      sort: true,
      filter: true
    }),
    
    new DtColumnItem<TeamGridDto, string>().setData({
      columnName: this.translateSV.instant('PAGES.MAIN.TEAMS.LIST.COLUMN.NAME'),
      field: 'name',
      sort: true,
      filter: true
    }),
    new DtColumnItem<TeamGridDto, string>().setData({
      columnName: this.translateSV.instant('PAGES.MAIN.TEAMS.LIST.COLUMN.LEAGUE'),
      field: 'league',
      sort: true,
      filter: true
    })    
  ];
  }

  async dtGetterFn(queryParams: { [param: string]: any }, filters: FilterItem[]): Promise<TeamGridDtoCollectionList> {

    const request: TeamFilterDtoDatatableDto = {
      filters: {
        id: filters.find(f => f.field === nameof<TeamGridDto>('id'))?.value as number,
        name:filters.find(f => f.field === nameof<TeamGridDto>('name'))?.value as string,
        league:filters.find(f => f.field === nameof<TeamGridDto>('league'))?.value as string 
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

  deletePlayer(): void {
    this.teamSV.apiTeamDelete$Json({ Id: this._teamIdDelete })
      .subscribe(() => {
        this.toastSV.success(
          this.translateSV.instant('SUCCESS.USER.DELETE_MESSAGE'),
          this.translateSV.instant('SUCCESS.USER.DELETE_HEADER'),
        )
        this.showModal = false;
        this.dtTeams.refreshData();
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
