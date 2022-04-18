import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StringUtilities } from 'ax-toolbox';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/api/services';
import { ServerSideError } from 'src/app/shared/interceptors/api-error/api-error.interceptor';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  _isLoading = false;
  _confirmedPassword = true;
  _activeConfirm = false;
  _userData: any = {
    token: '',
    password: ''
  };

  confirmPassword = '';
  _errors: any = {};

  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private authSV: AuthService,
    private toastSv: ToastrService,
    private translateSv: TranslateService
  ) { }

  ngOnInit(): void {
    this.initListeners();
  }

  onChangeConfirmPassword() {
    this._confirmedPassword = this._userData.password === this.confirmPassword;
    if (this._confirmedPassword) {
      this._activeConfirm = true;
    } else {
      this._activeConfirm = false;
      this._errors['REPASSWORD'] = 'PAGES.AUTH.LOGIN.PASSWORDFORGET.LABEL.NOCOINCIDENCE';
    }
  }

  async onFormSubmit(ev: MouseEvent) {
    let success = false;
    let redirectTo = null;
    try {
      this._isLoading = true;
      redirectTo = '/';
      success = await this.authSV.apiAuthResetpwdPost$Json({
        body: this._userData
      }).pipe(first())
        .toPromise();
    }
    catch (err) {
      if (err instanceof ServerSideError) {
        const propertyAndErrors: string[] = [];
        Object.keys(err.errorData.errors)
          .map((property) => {
            propertyAndErrors[property.toUpperCase()] = err.errorData.errors[property];
          });
        this._errors = propertyAndErrors;
      }
    }
    finally {
      if (success) {
        this.toastSv.success(
          this.translateSv.instant('API.SUCCESS.RECOVERY.ONSUBMIT.MESSAGE'),
          this.translateSv.instant('API.SUCCESS.RECOVERY.ONSUBMIT.HEADER')
        );
        const angularRoute = this.router.parseUrl(redirectTo);
        this.router.navigateByUrl(angularRoute).then(() => { });
      } else {
        this.toastSv.error(
          this.translateSv.instant('API.ERROR.RECOVERY.ONSUBMIT.MESSAGE'),
          this.translateSv.instant('API.ERROR.RECOVERY.ONSUBMIT.HEADER')
        );
        this._isLoading = false;
      }
    }
  }

  private goBackToLogin() {
    this.router.navigate(['/auth/login']);
  }

  private initListeners() {
    this._isLoading = true;
    this.aRoute.queryParamMap.subscribe(async (data) => {
      const route = this.router.url;
      if (route.match('recovery')) {
        const t = data.get('token');
        if (StringUtilities.isNullOrWhitespace(t)) {
          this.goBackToLogin();
        } else {
          this._userData.token = t;
        }
      }
      else {
        this.goBackToLogin();
      }
      this._isLoading = false;
    });
  }
}
