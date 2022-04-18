import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PartDto, TaskSelectDto, UserSelectDto } from 'src/app/shared/api/models';
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
  _item: PartDto = {
    id: 0,
    date: new Date().toISOString(),
    invertedHours: 0,
    comments: "",
    userId: 0,
    taskId: 0,
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

  //Lista con filtros USUARIO
  async acUserGetterFn(filter?: string, pSize: number = 20) {
    const resp = await this.userSV.apiUserSelectGet$Json({ name: filter }).pipe(first()).toPromise();

    const result = resp.items.map(user => {
      const asLav = new LabelAndValueExtended<number>().setData({
        label: user.nombre,
        value: user.id,
        extraData: user
      });
      return asLav;
    });
    return result;
  }

  //Lista con filtros TAREA
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
  }

  //BotonSAVE
  async saveForm() {
    this._serverSideError = {};
    try {
      const formselectedDate =  (this.selectedDate != undefined && this.selectedDate != '') ? new Date(this.selectedDate).toISOString() : null;
      this._item.date= formselectedDate;

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

  }
  
  //Boton Volver
  public goBack() {
    this.location.back();
  }

  //Metodo de inicio de la pagina
  mostrar(): void {
    this.aRoute.paramMap.subscribe(async (data) => {
      console.log(data);
      const id = data.get('id');
 

      if (this.parentUrl.match('new')) {    
       
        
        if(id){
          this._item.taskId = parseInt(id);
          console.log(this._item.taskId);

        this.taskSV.apiTaskGetTaskGet$Json({ id: this._item.taskId }).pipe(first()).toPromise().then(data => {
          this.selecTaskName = data.name;
          this.selectTaskId = data.id;
          console.log(this.selecTaskName + " | " + this.selectTaskId);
        });
      }
        //Seleccionar Usuario
        this._item.userId = parseInt(data.get('userId'));
        this.userSV.apiUserUserLoggedGet$Json().pipe(first()).toPromise().then(data =>{
          this.selectUserName = data.name;
          this._item.userId = data.id;
          this.selectUserId = data.id;
          console.log(this.selectUserName+" | "+this.selectUserId);
        });
        //Modificar el formato de fecha
        if (this._item.date) {
        this.selectedDate = this.datepipe.transform(this._item.date, 'MM/dd/yyyy');
        }        
        console.log("Entra por new");
        this.esNuevoItem = true;
        this._isLoading = false;
      } else { //Edit
        if (id==null) {
          this.goBack();
          return;
        }
         //guardamos el id como numero
         this._item.id = parseInt(id);

         //Creamos un objeto de tipo parte y nos traemos ese proyecto si es igual al id
         this.servicio.apiPartGetPartGet$Json({ id: this._item.id }).subscribe(result => {
           this._item = result;
 
           if (this._item.date) {
             this.selectedDate = this.datepipe.transform(this._item.date, 'yyyy-MM-dd');
           }
 
           if (this._item.userId) {
             //Obtener nombre del Usuario
             
             this.userSV.apiUserGetUsuarioGet$Json({ Id: this._item.userId }).pipe(first()).toPromise().then(data => {
               this.selectUserName = data.name + " " +data.surnames;
             });

             this.taskSV.apiTaskGetTaskGet$Json({id: this._item.taskId }).pipe(first()).toPromise().then(data => {
              this.selecTaskName = data.name;
             });
            
            
 
           }
 
           console.log(this._item);
           if (this._item == null) {
             this.goBack();
             return;
           }
             //this.dstart = new Date(result.date);
             this.partSelected = this._item.id;
             this.selectUserName;
             this._isLoading = false;
           
         })
      }
    
    });


  }

  //Seleccion de objetos
  onSelectUser(event: number) {
    this._item.userId = event;
  }

  onSelectTask(event: number) {
    this._item.taskId = event;
  }

  

}
