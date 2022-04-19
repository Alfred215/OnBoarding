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

  _item: TeamDto = {
    id: 0,
    name: "",
    league: "",
    active: null
  }
  

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
    this.dtParts.refreshData();
  }

  async deletePart(Id: number) {
    const resp = await this.teamSV.apiTeamDelete$Json().pipe(first()).toPromise();
  }

  /*
  onSelectedUser(event: number) {
    this.selectedUser = event;
    this._item.userId = event;
    this.dtParts.refreshData();
  }*/

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

  async onBtnModalConfirmation() {
    try {

      await this.deletePart(this.idDelete);
      this.toastSV.success(
        this.translateSV.instant('TOASTR.PARTS.ITEM.DELETE.LABEL'),
        this.translateSV.instant('TOASTR.PARTS.ITEM.DELETE.MESSAGE')
      );

      this.dtParts.refreshData(true);
      this.mDeleteConfirm.close();

    } catch (error) {

      this.toastSV.error(
        this.translateSV.instant('API.ERROR.TOASTR.PARTS.DELETE.LABEL'),
        this.translateSV.instant('API.ERROR.TOASTR.PARTS.DELETE.MESSAGE')
      );

      this.mDeleteConfirm.close();

    } 

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
