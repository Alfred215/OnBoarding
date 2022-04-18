import { Component, OnInit, ViewChild } from '@angular/core';
import { translate } from '@angular/localize/src/translate';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AxBsDatatableNewItemType, BsDatatableComponent, DtActionButton, DtActionColumnButton, DtColumnItem, FilterItem, nameof } from 'ax-toolbox';
import { first } from 'rxjs/operators';
import { UserFilterDtoDatatableDto, UserGridDto, UserGridDtoCollectionList } from 'src/app/shared/api/models';
import { PartService, UserService } from 'src/app/shared/api/services';
import { Roles } from 'src/app/shared/models/enums/role.enum';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  dtColumns: DtColumnItem[] = [];
  dtColumnsActionButtons = [];
  _dummyNewItemType = { ...AxBsDatatableNewItemType };
  @ViewChild('dtUsers') dtUsers: BsDatatableComponent;

  mostrar: boolean;

  //Graphics
  _showGraphics: boolean = false;
  _chartData: Array<any> = [];
  _hours: Array<any> = [];
  _parts: Array<any> = [];
  _chartLegend = true;
  _chartType = 'line';

  //Roles
  _isAdmin: boolean = false;
  _isTutor: boolean = false;
  _canEdit: boolean = false;

  constructor(
    private translateSV: TranslateService,
    private router: Router,
    private userSV: UserService,
    private authSV: AuthService,
    private partSV: PartService) { }

  async ngOnInit() {
    await this.checkRoles();
    this.getData();
    this.initbtnPlus();
    this.initcolumns();
  }

  async checkRoles() {
    const roles = await this.authSV.getUserRol();

    this._isAdmin = (roles.indexOf(Roles.Admin) !== -1) ? true : false;
    this._isTutor = (roles.indexOf(Roles.Tutor) !== -1) ? true : false;

    if (this._isAdmin || this._isTutor)
      this._canEdit = true;
    else
      this._canEdit = false

    console.log(this._canEdit);
  }

  async deleteUser(id: number, mostrar: boolean) {
    const resp = await this.userSV.apiUserDelete$Json({ Id: id, Mostrar: mostrar }).pipe(first()).toPromise();
  }

  async dtGetterFn(queryParams: { [param: string]: any }, filters: FilterItem[])
    : Promise<UserGridDtoCollectionList> {

    const request: UserFilterDtoDatatableDto = {
      filters: {
        id: filters.find(f => f.field === nameof<UserGridDto>('id'))?.value as number,
        username: filters.find(f => f.field === nameof<UserGridDto>('username'))?.value as string,
        name: filters.find(f => f.field === nameof<UserGridDto>('name'))?.value as string,
        surnames: filters.find(f => f.field === nameof<UserGridDto>('surnames'))?.value as string,
        email: filters.find(f => f.field === nameof<UserGridDto>('email'))?.value as string,
        dni: filters.find(f => f.field === nameof<UserGridDto>('dni'))?.value as string

      },
      pageIndex: queryParams.pi,
      pageSize: queryParams.ps,
      sortDescending: queryParams.sd,
      sortName: queryParams.sn,
    };
    const user = await this.userSV.apiUserDatatablePost$Json({ body: request })
      .pipe(first())
      .toPromise();
    return user;
  }

  private async initbtnPlus() {
    this.dtColumnsActionButtons = [];

    if (this._isAdmin == true) {
      this.dtColumnsActionButtons = [
        new DtActionButton().setData({
          tooltip: this.translateSV.instant('ADD'),
          iconPreffix: faPlus.prefix,
          iconName: faPlus.iconName,
          btnClass: 'btn btn-sm btn-success btn-light',
          onClick: () => {
            this.router.navigate(['users/new'])
          }
        })
      ];
    }
  }

  private async initcolumns() {

    this.dtColumns = [];

    if (this._isAdmin == true) {
      this.dtColumns.push(
        new DtColumnItem<UserGridDto, string>().setData({
          thTHeadClass: 'cell-narrow',
          buttons: [
            new DtActionColumnButton<UserGridDto, string>().setData({
              onClick: (ev: Event, dt: BsDatatableComponent<any>, item: UserGridDto) => {
                this.router.navigate(['users/edit', item.id]);
              },
              iconPreffix: 'fas',
              iconName: 'edit',
              tooltip: this.translateSV.instant('EDIT'),
              btnClass: 'btn btn-sm btn-warning text-white',
            }),
            new DtActionColumnButton<UserGridDto, string>().setData({
              onClick: (ev: Event, dt: BsDatatableComponent<any>, item: UserGridDto) => {
                const idDelete = item.id;

                this.mostrar = true;

                this.deleteUser(idDelete, this.mostrar);
                this.dtUsers.refreshData();


              },
              iconName: 'lock',
              iconPreffix: 'fas',
              tooltip: this.translateSV.instant('LOCK'),
              btnClass: 'btn btn-sm btn-danger text-white'
            }),
            new DtActionColumnButton<UserGridDto, string>().setData({
              onClick: (ev: Event, dt: BsDatatableComponent<any>, item: UserGridDto) => {
                const idDelete = item.id;

                this.mostrar = false;

                this.deleteUser(idDelete, this.mostrar);
                this.dtUsers.refreshData();


              },
              iconName: 'lock-open',
              iconPreffix: 'fas',
              tooltip: this.translateSV.instant('UNLOCK'),
              btnClass: 'btn btn-sm btn-info text-white'
            })

          ]

        }),

      )
    }
    this.dtColumns.push(new DtColumnItem<UserGridDto, string>().setData({
      columnName: this.translateSV.instant('PAGES.MAIN.USERS.LIST.COLUMN.ID'),
      field: 'id',
      sort: true,
      filter: true
    }),
      new DtColumnItem<UserGridDto, string>().setData({
        columnName: this.translateSV.instant('PAGES.MAIN.USERS.LIST.COLUMN.USERNAME'),
        field: 'username',
        sort: true,
        filter: true
      }),

      new DtColumnItem<UserGridDto, string>().setData({
        columnName: this.translateSV.instant('PAGES.MAIN.USERS.LIST.COLUMN.NAME'),
        field: 'name',
        sort: true,
        filter: true
      }),
      new DtColumnItem<UserGridDto, string>().setData({
        columnName: this.translateSV.instant('PAGES.MAIN.USERS.LIST.COLUMN.SURNAMES'),
        field: 'surnames',
        sort: true,
        filter: true
      }),
      new DtColumnItem<UserGridDto, string>().setData({
        columnName: this.translateSV.instant('PAGES.MAIN.USERS.LIST.COLUMN.EMAIL'),
        field: 'email',
        sort: true,
        filter: true
      }),
      new DtColumnItem<UserGridDto, string>().setData({
        columnName: this.translateSV.instant('PAGES.MAIN.USERS.LIST.COLUMN.DNI'),
        field: 'dni',
        sort: true,
        filter: true
      }),

      new DtColumnItem<UserGridDto, boolean>().setData({
        columnName: this.translateSV.instant('PAGES.MAIN.USERS.LIST.COLUMN.ESTATE'),
        field: 'borrado',
        sort: true,
        filter: true
      })
    );



  }


  // GRAFICA

  mostrarGraficos(): boolean {
    if (this._showGraphics) {
      this._showGraphics = false;
      return this._showGraphics;
    } else {
      this._showGraphics = true;
      return this._showGraphics;
    }
  }


  //Barra
  async getData() {

    const resp = await this.partSV.apiPartTotalHourListMonthPost$Json().pipe(first()).toPromise();
  
      resp.items.forEach((x)=>{
        console.log(x);
        this._hours.push(x.totalHours);
        this._parts.push(x.totalParts);
      })
      this._chartData.push({data: this._hours, label: "Horas totales"});
      this._chartData.push({data: this._parts, label: "Partes totales"});
    }
    

  _labels: Array<any> = [this.translateSV.instant('GENERIC.MONTHS.JANUARY'), this.translateSV.instant('GENERIC.MONTHS.FEBRUARY'), this.translateSV.instant('GENERIC.MONTHS.MARCH'),
  this.translateSV.instant('GENERIC.MONTHS.APRIL'), this.translateSV.instant('GENERIC.MONTHS.MAY'), this.translateSV.instant('GENERIC.MONTHS.JUNE'), this.translateSV.instant('GENERIC.MONTHS.JULY'),
  this.translateSV.instant('GENERIC.MONTHS.AUGUST'), this.translateSV.instant('GENERIC.MONTHS.SEPTEMBER'), this.translateSV.instant('GENERIC.MONTHS.OCTOBER'),
  this.translateSV.instant('GENERIC.MONTHS.NOVEMBER'), this.translateSV.instant('GENERIC.MONTHS.DECEMBER')];

  _options: any = {
    animation: false,
    responsive: true,
    
    legend: {
      position: 'top'
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true
          //doesnt work
        }
      }
    }
    
  };
  _colours: Array<any> = [
    {
      // dark grey
      backgroundColor: 'rgba(93,93,123,0.2)',
      hoverBackgroundColor: '#fff',
      borderColor: 'rgba(123,123,63,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
 

}
