import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { TaskDto } from 'src/app/shared/api/models';
import { TaskService } from 'src/app/shared/api/services';
import { ServerSideError } from 'src/app/shared/interceptors/api-error/api-error.interceptor';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styleUrls: ['./tasks-item.component.scss']
})
export class TasksItemComponent implements OnInit {

  _item: TaskDto = {
    id: 0,
    name: "",
    estimatedHours: 0,
    comement: ""
  }

  parentUrl = this.router.url;
  _isLoading = true;
  newId: number;
  _serverSideError: any = {};
  esNuevoItem: boolean = false;

  //Para el DropBox
  partSelected: number;
  dstart: Date;
  dend: Date;
  selectedDate: string;

  constructor(
    public cdRef: ChangeDetectorRef,
    public router: Router,
    public aRoute: ActivatedRoute,
    public servicio: TaskService,
    private location: Location,
    private toastrSV: ToastrService,
    private translateSv: TranslateService
  ) {}

  ngOnInit(): void {
    this.mostrar();
  }

  async saveForm() {
    this._serverSideError = {};
    try {
      const resp = await this.servicio.apiTaskSetTaskPost$Json({ body: this._item }).pipe(first()).toPromise();

      this.toastrSV.success(
        this.translateSv.instant('TOASTR.TASKS.ITEM.SAVED.SUCCESS.MESSAGE'),
        this.translateSv.instant('TOASTR.TASKS.ITEM.SAVED.SUCCESS.LABEL')
      );
      this.goBack();
    } catch (err) {
      if (err instanceof ServerSideError) {
        const propertyAndErrors: string[] = [];

        if (err.errorData.errors) {
          Object.keys(err.errorData.errors).map((property) => {
            propertyAndErrors[property.toUpperCase()] = err.errorData.errors[property];
          });
          this._serverSideError = propertyAndErrors;
          this.toastrSV.error
            (
              this.translateSv.instant('TOASTR.TASKS.ITEM.ERROR.MESSAGE'),
              this.translateSv.instant('TOASTR.TASKS.ITEM.ERROR.LABEL')
            );
        }
        else if (err.errorData) {
          Object.keys(err.errorData).map((property) => {
            propertyAndErrors[property.toUpperCase()] = err.errorData[property];
          });
          this._serverSideError = propertyAndErrors;
          this.toastrSV.error
            (
              this.translateSv.instant('TOASTR.PARTS.ITEM.ERROR.MESSAGE'),
              this.translateSv.instant('TOASTR.PARTS.ITEM.ERROR.LABEL')
            );
        }
      }
    }

  }

  public goBack() {
    this.location.back();
  }

  mostrar(): void {
    const childS = this.aRoute.paramMap.subscribe((data) => {
      const id = data.get('id');
      if (this.parentUrl.match('new')) {
        if (id) {
          this.goBack();
          return
        }
        console.log("Entra por new");
        this.esNuevoItem = true;
        this._isLoading = false;
      } else {
        if (!id) {
          this.goBack();
          return;
        }
      }
      //guardamos el id como numero
      this.newId = parseInt(id);

      //Creamos un objeto de tipo Proyecto y nos traemos ese proyecto si es igual al id
      this.servicio.apiTaskGetTaskGet$Json({ id: this.newId }).subscribe(result => {
        this._item = result;
        
        console.log(this._item);
        if (this._item == null) {
          this.goBack();
          return;
        }
        if (this.newId === result.id) {
          
          this.partSelected = this._item.id;
          this._isLoading = false;
        }
      })
    });

  }

}
