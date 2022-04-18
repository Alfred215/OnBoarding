import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AxBsDatatableNewItemType, BsDatatableComponent, BsModalConfirmationMessageComponent, DtActionButton, DtActionColumnButton, DtColumnItem, FilterItem, nameof } from 'ax-toolbox';
import { first } from 'rxjs/operators';
import { TaskFilterTableDtoDatatableDto, TaskGridDto, TaskGridDtoCollectionList } from 'src/app/shared/api/models';
import { TaskService } from 'src/app/shared/api/services';
import { Roles } from 'src/app/shared/models/enums/role.enum';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  dtColumns: DtColumnItem[] = [];
  dtColumnsActionButtons = [];
  _dummyNewItemType = { ...AxBsDatatableNewItemType };
  @ViewChild('dtTasks') dtTasks: BsDatatableComponent;
  @ViewChild('mDeleteConfirm') mDeleteConfirm: BsModalConfirmationMessageComponent;

  _canEdit: boolean;
  _isAdmin: boolean;
  _isTutor: boolean;

  idDelete: number;

  constructor(
    private translateSV: TranslateService,
    private router: Router,
    public taskSV: TaskService,
    public authSV: AuthService,
    private toastSV: ToastrService
  ) { }

  async ngOnInit() {
    await this.checkRoles();
    this.initbtnPlus();
    this.initcolumns();
  }

  async deleteTask(id: number) {
    const resp = await this.taskSV.apiTaskDelete$Json({ id: id }).pipe(first()).toPromise();
  }

  async checkRoles() {
    const roles = await this.authSV.getUserRol();

    this._isAdmin = (roles.indexOf(Roles.Admin) !== -1) ? true : false;
    this._isTutor = (roles.indexOf(Roles.Tutor) !== -1) ? true : false;

    if(this._isAdmin || this._isTutor)
      this._canEdit = true;
    else
      this._canEdit = false
    
    console.log(this._canEdit);
  }

  async dtGetterFn(queryParams: { [param: string]: any }, filters: FilterItem[])
    : Promise<TaskGridDtoCollectionList> {

    const request: TaskFilterTableDtoDatatableDto = {
      filters: {
        id: filters.find(f => f.field === nameof<TaskGridDto>('id'))?.value as number,
        name: filters.find(f => f.field === nameof<TaskGridDto>('name'))?.value as string,
        estimatedHours: filters.find(f => f.field === nameof<TaskGridDto>('estimatedHours'))?.value as number

      },
      pageIndex: queryParams.pi,
      pageSize: queryParams.ps,
      sortDescending: queryParams.sd,
      sortName: queryParams.sn,
    };
    const parts = await this.taskSV.apiTaskDatatablePost$Json({ body: request })
      .pipe(first())
      .toPromise();
    return parts;
  }

  async onBtnModalConfirmation() {
    try {

      await this.deleteTask(this.idDelete);
      this.toastSV.success(
        this.translateSV.instant('SUCCESS.ACRONYM.MESSAGE.DELETE'),
        this.translateSV.instant('SUCCESS.ACRONYM.HEADER')
      );

      this.dtTasks.refreshData(true);
      this.mDeleteConfirm.close();

    } catch (error) {

      this.toastSV.error(
        this.translateSV.instant('API.ERROR.TOASTR.ACRONYM.MESSAGE.DELETE'),
        this.translateSV.instant('API.ERROR.TOASTR.ACRONYM.HEADER')
      );

      this.mDeleteConfirm.close();

    } 

  }

  private async initbtnPlus() {
    if(this._canEdit == true){
      this.dtColumnsActionButtons = [
        new DtActionButton().setData({
          tooltip: this.translateSV.instant('ADD'),
          iconPreffix: faPlus.prefix,
          iconName: faPlus.iconName,
          btnClass: 'btn btn-sm btn-success',
          onClick: () => {
            this.router.navigate(['tasks/new']);
          }
        })
      ];
    }
    else{
      this.dtColumnsActionButtons = []
    }
    
  }

  private async initcolumns() {

    this.dtColumns = [];
    
    if(this._canEdit == false) {
      this.dtColumns.push(
        new DtColumnItem<TaskGridDto, string>().setData({
          thTHeadClass: 'cell-narrow',
          buttons: [
            new DtActionColumnButton<TaskGridDto, string>().setData({
              onClick: (ev: Event, dt: BsDatatableComponent<any>, item: TaskGridDto) => {
                this.router.navigate(['/parts/new', item.id]);
              },
              iconPreffix: 'fas',
              iconName: 'paperclip',
              tooltip: this.translateSV.instant('SEND'),
              btnClass: 'btn btn-sm btn-primary text-black',
            })
          ]
        })
      );

    }else{
      this.dtColumns.push(
        new DtColumnItem<TaskGridDto, string>().setData({
          thTHeadClass: 'cell-narrow',
          buttons: [
            new DtActionColumnButton<TaskGridDto, string>().setData({
              onClick: (ev: Event, dt: BsDatatableComponent<any>, item: TaskGridDto) => {
                this.router.navigate(['tasks/edit', item.id]);
              },
              iconPreffix: 'fas',
              iconName: 'edit',
              tooltip: this.translateSV.instant('EDIT'),
              btnClass: 'btn btn-sm btn-warning text-white',
            }),
            new DtActionColumnButton<TaskGridDto, string>().setData({
              onClick: (ev: Event, dt: BsDatatableComponent<any>, item: TaskGridDto) => {
                /*const idDelete = item.id;

                this.deleteTask(idDelete);
                this.dtTasks.refreshData();*/

                this.idDelete = item.id;
                this.mDeleteConfirm.open();


              },
              iconName: 'trash',
              iconPreffix: 'fas',
              tooltip: this.translateSV.instant('DELETE'),
              btnClass: 'btn btn-sm btn-danger text-white'
            })
          ]
        })
      );

    }


    this.dtColumns.push(
      new DtColumnItem<TaskGridDto, string>().setData({
        columnName: this.translateSV.instant('PAGES.MAIN.TASKS.LIST.COLUMN.ID'),
        field: 'id',
        sort: true,
        filter: true
      }),
      new DtColumnItem<TaskGridDto, string>().setData({
        columnName: this.translateSV.instant('PAGES.MAIN.TASKS.LIST.COLUMN.NAME'),
        field: 'name',
        sort: true,
        filter: true
      }),
      new DtColumnItem<TaskGridDto, number>().setData({
        columnName: this.translateSV.instant('PAGES.MAIN.TASKS.LIST.COLUMN.ESTIMATEDHOURS'),
        field: 'estimatedHours',
        sort: true,
        filter: true
      }),
      new DtColumnItem<TaskGridDto, string>().setData({
        columnName: this.translateSV.instant('PAGES.MAIN.TASKS.LIST.COLUMN.COMMENTS'),
        field: 'comement',
        sort: true,
        filter: false
      })
    );



  }

}
