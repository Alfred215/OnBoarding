import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TeamDto, PlayerDto } from 'src/app/shared/api/models';
import { TeamService, PlayerService} from 'src/app/shared/api/services';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common'
import { LabelAndValueExtended } from 'ax-toolbox';
import { ToastrService } from 'ngx-toastr';
import { ServerSideError } from 'src/app/shared/interceptors/api-error/api-error.interceptor';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-players-item',
  templateUrl: './players-item.component.html',
  styleUrls: ['./players-item.component.scss']
})
export class PlayersItemComponent implements OnInit {

  parentUrl = this.router.url;

  item: PlayerDto = {
    id: 0,
    name: "",
    number: 0,
    position:"",
    teamId:0
  }

  _isLoading = true;
  newItem: boolean;
  editItem: boolean;
  itemErrors = [];  

  public _serverSideError: any = {};

  constructor(
    public router: Router,
    public aRoute: ActivatedRoute,
    public playerSV: PlayerService,
    private location: Location,
    private toastrSV: ToastrService,
    private translateSV: TranslateService,
  ) { }  

  ngOnInit(): void {
    this.ngListener();
  }

   //Metodo de inicio de la pagina
   public ngListener(){
    this.aRoute.paramMap.subscribe(async (data) => {
      const router = this.router.url;
      const id = Number(data.get('id'));
      //this.subordinate = false;
      if (router.match) {
        if (router.match('new')) {
          this.newItem = true;
          this.editItem = false;
        } else {
          if (!id || this.item.id === undefined) {
            this.goBack();
            return;
          }
          //this.item = await this.getPlayerByID(id);
          if (router.match('edit')) {
            this.newItem = false;
            this.editItem = true;
          } 
        }
      }
    });
  }

  
  async getPlayerByID(id: number): Promise<PlayerDto> {
    try {
      return await this.playerSV.apiPlayerGet$Json({ body: id }).pipe(first()).toPromise();
    } catch (error) {
      return error;
    }
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

  //BotonSAVE
  async onBtnSave(): Promise<void> {
    try {
       await this.playerSV.apiPlayerPost$Json({ body: this.item })
        .pipe(first())
        .toPromise();
        
      this.toastrSV.success(
        this.translateSV.instant('SUCCESS.USER.CREATE_EDIT_MESSAGE'),
        this.translateSV.instant('SUCCESS.USER.CREATE_EDIT_HEADER')
      );

    } catch (err) {
      if (err instanceof ServerSideError) {
        const propertyAndErrors: string[] = [];
        if (err.errorData.errors) {
          Object.keys(err.errorData.errors)
            .map((property) => {
              propertyAndErrors[property.toUpperCase()] = err.errorData.errors[property];
            });
          this.itemErrors = propertyAndErrors;
        }

        if (err.errorData) {
          Object.keys(err.errorData)
            .map((property) => {
              if (Array.isArray(err.errorData[property])) {
                propertyAndErrors[property.toUpperCase()] = err.errorData[property];
              }
            });
          this.itemErrors = propertyAndErrors;
          this.toastrSV.error(
            this.translateSV.instant('API.ERROR.USER.MESSAGE_ERROR'),
            this.translateSV.instant('API.ERROR.USER.TITLE_ERROR')
          );
         
        }
      }
    }
  }
  //Boton Volver
  public goBack() {
    this.location.back();
  }

 
  //Seleccion de objetos
}
