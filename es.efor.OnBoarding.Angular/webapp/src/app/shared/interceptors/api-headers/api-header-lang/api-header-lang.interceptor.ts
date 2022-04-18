import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ApiHeaderLangInterceptor implements HttpInterceptor {

  translate: TranslateService;
  constructor(
    private readonly injector: Injector,
  ) {
    this.translate = this.injector.get(TranslateService);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.translate.currentLang) {
      const clone = request.clone({
        headers: request.headers
          .set('lang', this.translate.currentLang),
      });
      return next.handle(clone);
    } else {
      return next.handle(request);
    }
  }
}
