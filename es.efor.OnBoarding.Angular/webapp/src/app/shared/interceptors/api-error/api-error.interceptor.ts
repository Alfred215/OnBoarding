import { Injectable, Injector } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { SetData } from 'ax-toolbox';
import { TranslateService } from '@ngx-translate/core';

// STATUS CODE GENERIC ERRORS
marker('TOAST_ERR_HTTP_0_TITLE');
marker('TOAST_ERR_HTTP_0_BODY');

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  private toastSV: ToastrService;
  private translate: TranslateService;
  constructor(
    private injector: Injector,
  ) {
    this.toastSV = this.injector.get(ToastrService);
    this.translate = this.injector.get(TranslateService);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(catchError(error => {
        if (error instanceof ErrorEvent) { }
        else if (error instanceof HttpErrorResponse) {
          let func: ServerSideErrorHandler = this['handleServerStatus' + error.status];
          if (func) {
            func = func.bind(this);
            const errorMessage = func(error);

            if (errorMessage && errorMessage.toastData && (errorMessage.toastData.title || errorMessage.toastData.message)) {
              const config: Partial<IndividualConfig> = { extendedTimeOut: 4000 };
              if (errorMessage.toastData.isHtml) { config.enableHtml = true; }
              // if (errorMessage.iconCssClass) config = {icon};
              this.toastSV.error(errorMessage.toastData.message, errorMessage.toastData.title, config);
            }
            if (errorMessage) {
              return throwError(errorMessage);
            }

          }
        }

        return throwError(error);
      }));
  }


  private handleServerStatus0(error: HttpErrorResponse) {
    return new ServerSideError().setData({
      toastData: new ErrorAsToast().setData({
        iconCssClass: 'fas fa-plug',
        title: this.translate.instant('TOAST_ERR_HTTP_0_TITLE'),
        message: this.translate.instant('TOAST_ERR_HTTP_0_BODY'),
      }),
    });
  }
  private handleServerStatus400(error: HttpErrorResponse) {
    const err = this.handleServerStatusGeneric(error);
    return err;
  }
  private handleServerStatus404(error: HttpErrorResponse) {
    const err = this.handleServerStatusGeneric(error);
    return err;
  }

  private handleServerStatusGeneric(error: HttpErrorResponse) {
    let parsed: ServerSideError = null;
    // let toast: ErrorAsToast = null;
    if (error.error) {
      try {
        let asObj: any = null;
        if (typeof (error.error) === 'string') {
          asObj = JSON.parse(error.error);
        } else if (typeof (error.error) === 'object') {
          asObj = error.error;
        }
        parsed = new ServerSideError();
        parsed.errorData = asObj;
        if (typeof (asObj) === 'string') { parsed.toastData.title = error.error; }
        else {
          if (asObj) {
            if (asObj._title) {
              if (asObj._title instanceof (Array)) {
                parsed.toastData.isHtml = true;
                parsed.toastData.title = (asObj._title as string[])
                  .map((key) => this.translate.instant(key) || key)
                  .join('<br>');
              }
              else if (typeof (asObj._title) === 'string') {
                parsed.toastData.message = this.translate.instant(asObj._title);
              }
            }
            if (asObj._message) {
              if (asObj._message instanceof (Array)) {
                parsed.toastData.message = (asObj._message as string[])
                  .map((key) => this.translate.instant(key) || key)
                  .join('<br>');
                parsed.toastData.isHtml = true;
              }
              else if (typeof (asObj._message) === 'string') {
                parsed.toastData.message = this.translate.instant(asObj._message);
              }
            }
          }
        }
      }
      catch (e) {

      }
    }
    return parsed;
  }
}

type ServerSideErrorHandler = (error: HttpErrorResponse) => ServerSideError;
class ErrorAsToast extends SetData<ErrorAsToast> {
  title: string;
  message: string;
  iconCssClass = 'fa fa-warning';
  isHtml = false;
}
export class ServerSideError extends SetData<ServerSideError> {
  toastData: ErrorAsToast = new ErrorAsToast();
  errorData: { [key: string]: string[] }
}
