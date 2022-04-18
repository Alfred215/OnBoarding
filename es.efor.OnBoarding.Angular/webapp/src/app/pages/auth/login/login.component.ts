import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerSideError } from 'src/app/shared/interceptors/api-error/api-error.interceptor';
import { MetadataRobotConfiguration, SeoService } from 'src/app/shared/services/seo/seo.service';
import { first } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/services/token/token.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AuthService  as AccountService} from 'src/app/shared/api/services/auth.service';
import { BsModalConfirmationMessageComponent, StringUtilities } from 'ax-toolbox';
import { ToastrService } from 'ngx-toastr';
//import { RecoverPasswordRequestDto } from 'src/app/shared/api/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('modalEmailToRecover') modalEmailToRecover: BsModalConfirmationMessageComponent;

  _userData: any = {};
  /*_userRecover: RecoverPasswordRequestDto = {
    user: ''
  };*/
  _errors: any = {};
  _errorMessage: string = null;

  _isLoading = false;
  _sendingEmail = false;

  private subs: Subscription[] = [];
  private returnUrl;
  constructor(
    private cdref: ChangeDetectorRef,
    private aRoute: ActivatedRoute,
    private router: Router,
    private accSV: AccountService,
    private authSV: AuthService,
    private seo: SeoService,
    private tokenSV: TokenService,
    private toastSv: ToastrService,
    private translateSv: TranslateService
  ) {
    this.initListeners();

    this.seo.clearMetadata();
    this.seo.setMetadata({}, [MetadataRobotConfiguration.None]);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }

  onFormSubmit(ev: SubmitEvent) {
    if (!ev.isTrusted) { return; }

    this._isLoading = true;
    this._errors = {};
    this.cdref.detectChanges();

    this.performLogin();
  }

  onRecoverPasswordByEmail() {
    //this.sentRecoverEmail();
  }

  private async performLogin() {
    try {
      await this.authWithJwt();
      // await this.authWithCookies();

      let redirectTo = this.returnUrl;
      this._userData = {};
      this.cdref.detectChanges();
      if (StringUtilities.isNullOrWhitespace(redirectTo) || redirectTo === '/') {
        redirectTo = '/';
      }
      const angularRoute = this.router.parseUrl(redirectTo);
      this.router.navigateByUrl(angularRoute).then(() => { });
    } catch (err) {
      this._errors.loginError = true;
      this.cdref.detectChanges();
    } finally {
      this._isLoading = false;
    }
  }


  private authWithJwt() {
    return new Promise<void>((resolve, reject) => {
      this.accSV.apiAuthLoginPost$Json({ body: this._userData })
        .pipe(first(() => true))
        .subscribe(
          (data) => {
            this.tokenSV.setStoredToken(data);
            resolve();
          }, (err: ServerSideError | any) => {
            reject(err);
          });
    });
  }

  /*private authWithCookies() {
    return new Promise<void>((resolve, reject) => {
      this.accSV.apiAuthRegisterPost({ body: this._userData })
        .pipe(first(() => true))
        .subscribe(
          () => {
            resolve();
          }, (err: ServerSideError | any) => {
            reject(err);
          });
    });
  }*/

  /*private async sentRecoverEmail() {
    let sended = false;
    this._sendingEmail = true;
    this._userRecover.user = this._userData.username;
    try {
      sended = await this.authSV.accSV.apiAuthRecoverpwdPost$Json({
        body: this._userRecover
      }).pipe(first())
        .toPromise();
    } catch (err){
      this.toastSv.error(
        this.translateSv.instant('API.ERROR.LOGIN.SENDEMAIL.MESSAGE'),
        this.translateSv.instant('API.ERROR.LOGIN.SENDEMAIL.HEADER')
      );
    } finally {
      if (sended) {
        this.toastSv.success(
          this.translateSv.instant('API.SUCCESS.LOGIN.SENDEMAIL.MESSAGE'),
          this.translateSv.instant('API.SUCCESS.LOGIN.SENDEMAIL.HEADER')
        );
      }
      this.modalEmailToRecover.close();
      this._sendingEmail = false;
    }
  }*/

  private initListeners() {
    const s = this.aRoute.queryParamMap.subscribe((p) => {
      this._errorMessage = p.get('errMsg');
      this.returnUrl = p.get('ReturnUrl');
    });
    this.subs.push(s);
  }
}
interface SubmitEvent {
  bubbles: boolean;
  cancelBubble: boolean;
  cancelable: boolean;
  composed: boolean;
  currentTarget?: HTMLElement;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  path: HTMLElement[];
  returnValue: boolean;
  srcElement: HTMLElement;
  submitter: HTMLButtonElement | HTMLElement;
  target: HTMLFormElement;
  timeStamp: number;
  type: string;
}

export class UsernameDto {
  user: string;
}
