import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from 'src/app/shared/api/models';
import { UserService } from 'src/app/shared/api/services';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { ServerSideError } from 'src/app/shared/interceptors/api-error/api-error.interceptor';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Roles } from 'src/app/shared/models/enums/role.enum';

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.scss']
})
export class UsersItemComponent implements OnInit {

  _user: UserDto = {
    id: 0,
    username: "",
    password: "",
    name: "",
    surnames: "",
    email: "",
    dni: "",
    roleId: 0    
  }

  parentUrl = this.router.url;
  esNuevoItem: boolean;
  _isLoading: boolean;
  isAdmin: boolean;
  newUsername: number;
  userSelected: string;
  _serverSideError: any = {};

  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private userSV: UserService,
    private location: Location,
    private translateSV: TranslateService,
    private toastrSV: ToastrService,
    private authSV: AuthService
  ) { }

  ngOnInit(): void {
    this.mostrar();
  }

  async checkRoles(){
    const roles = await this.authSV.getUserRol();
    this.isAdmin = (roles.indexOf(Roles.Admin) !== -1) ? true : false;
  }

  async saveForm() {
    this._serverSideError = {};
    try {
      const resp = await this.userSV.apiUserSetUsuarioPost$Json({ body: this._user }).pipe(first()).toPromise();

      this.toastrSV.success(
        this.translateSV.instant('TOASTR.USERS.ITEM.SAVED.SUCCESS.MESSAGE'),
        this.translateSV.instant('TOASTR.USERS.ITEM.SAVED.SUCCESS.LABEL')
      );
      this.goBack();
    } catch (err) {
      this.toastrSV.error
            (
              this.translateSV.instant('TOASTR.USERS.ITEM.ERROR.MESSAGE'),
              this.translateSV.instant('TOASTR.USERS.ITEM.ERROR.LABEL')
            );

      if (err instanceof ServerSideError) {
        const propertyAndErrors: string[] = [];

        if (err.errorData.errors) {
          Object.keys(err.errorData.errors).map((property) => {
            propertyAndErrors[property.toUpperCase()] = err.errorData.errors[property];
          });
          this._serverSideError = propertyAndErrors;
          
        }
        else if (err.errorData) {
          Object.keys(err.errorData).map((property) => {
            propertyAndErrors[property.toUpperCase()] = err.errorData[property];
          });
          this._serverSideError = propertyAndErrors;
         
        }
      }
    }

  }

  goBack(){
    this.location.back();
  }

  mostrar(): void {
    const childS = this.aRoute.paramMap.subscribe((data) => {
      const username = data.get('username');
      if (this.parentUrl.match('new')) {
        if (username) {
          this.goBack();
          return
        }
        console.log("Entra por new");
        this.esNuevoItem = true;
        this._isLoading = false;
      } else {
        if (!username) {
          this.goBack();
          return;
        }
      }
      //guardamos el id como numero
      this.newUsername = parseInt(username);

      //Creamos un objeto de tipo Proyecto y nos traemos ese proyecto si es igual al id
      this.userSV.apiUserGetUsuarioGet$Json({ Id: this.newUsername}).subscribe(result => {
        this._user = result;
        
        console.log(this._user);
        if (this._user == null) {
          this.goBack();
          return;
        }
        if (this.newUsername === result.id) {
          
          this.userSelected = this._user.username;
          this._isLoading = false;
        }
      })
    });

  }
}
