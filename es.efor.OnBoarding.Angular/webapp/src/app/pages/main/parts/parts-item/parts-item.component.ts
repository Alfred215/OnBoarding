import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TeamDto, UserSelectDto } from 'src/app/shared/api/models';
import { PartService, TaskService, UserService } from 'src/app/shared/api/services';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common'
import { LabelAndValueExtended } from 'ax-toolbox';
import { ToastrService } from 'ngx-toastr';
import { ServerSideError } from 'src/app/shared/interceptors/api-error/api-error.interceptor';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-parts-item',
  templateUrl: './parts-item.component.html',
  styleUrls: ['./parts-item.component.scss']
})
export class PartsItemComponent implements OnInit {

  parentUrl = this.router.url;

  //DTO
  _item: TeamDto = {
    id: 0,
    name: "",
    league: ""
  }

 
  _isLoading = true;
  esNuevoItem: boolean = false;
  selectedDate: string;
  selecTaskName: string;
  selectUserName: string;
  partSelected: number;
  selectUserId: number;
  selectTaskId: number;
  dstart: Date;
  dend: Date;
  

  public _serverSideError: any = {};

  constructor(
    public cdRef: ChangeDetectorRef,
    public router: Router,
    public aRoute: ActivatedRoute,
    public servicio: PartService,
    private userSV: UserService,
    private taskSV: TaskService,
    private location: Location,
    private toastrSV: ToastrService,
    private translateSV: TranslateService,
    private datepipe: DatePipe
  ) { }  

  ngOnInit(): void {
    this.mostrar();
  }

  /*Lista con filtros TAREA
  async acTaskGetterFn(filter?: string, pSize: number = 20) {
    const resp = await this.taskSV.apiTaskSelecttaskGet$Json({ name: filter }).pipe(first()).toPromise();

    const result = resp.items.map(task => {
      const asLav = new LabelAndValueExtended<number>().setData({
        label: task.name,
        value: task.id,
        extraData: task
      });
      return asLav;
    });
    return result;
  }*/

  /*BotonSAVE
  async saveForm() {
    this._serverSideError = {};
    try {
      const formselectedDate =  (this.selectedDate != undefined && this.selectedDate != '') ? new Date(this.selectedDate).toISOString() : null;

      const resp = await this.servicio.apiPartSetPartPost$Json({ body: this._item }).pipe(first()).toPromise();

      this.toastrSV.success(
        this.translateSV.instant('TOASTR.PARTS.ITEM.SAVED.SUCCESS.MESSAGE'),
        this.translateSV.instant('TOASTR.PARTS.ITEM.SAVED.SUCCESS.LABEL')
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
              this.translateSV.instant('TOASTR.PARTS.ITEM.ERROR.MESSAGE'),
              this.translateSV.instant('TOASTR.PARTS.ITEM.ERROR.LABEL')
            );
        }
        else if (err.errorData) {
          Object.keys(err.errorData).map((property) => {
            propertyAndErrors[property.toUpperCase()] = err.errorData[property];
          });
          this._serverSideError = propertyAndErrors;
          this.toastrSV.error
            (
              this.translateSV.instant('TOASTR.PARTS.ITEM.ERROR.MESSAGE'),
              this.translateSV.instant('TOASTR.PARTS.ITEM.ERROR.LABEL')
            );
        }
      }
    }
  }*/
  
  //Boton Volver
  public goBack() {
    this.location.back();
  }

  //Metodo de inicio de la pagina
  public mostrar(){
    
  }
  //Seleccion de objetos
  onSelectLeague(event: string) {
    this._item.league = event;
  }
}
