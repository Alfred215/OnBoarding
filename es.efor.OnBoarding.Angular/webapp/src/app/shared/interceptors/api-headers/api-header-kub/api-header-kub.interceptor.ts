import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiHeaderKubInterceptor implements HttpInterceptor {
  private kubHeaders: KubHeaders = {};

  constructor(
    public toastSV: ToastrService
  ) {
    this.kubHeaders = JSON.parse(localStorage.getItem('kubh')) || {};
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const output = next.handle(request)
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            this.processResponse(error);
          }
          return throwError(error);
        }),
        map((r) => {
          if (r instanceof HttpResponse) {
            this.processResponse(r);
          }
          return r;
        }));
    return output;
  }

  private processResponse(response: HttpResponse<unknown> | HttpErrorResponse) {
    const kubHeaders = response.headers.keys()
      .filter((k) => k.toLowerCase().startsWith('kub'))
      .map((k) => ({ key: k, value: response.headers.get(k) }));
    this.checkKubHeaders(kubHeaders);
  }

  private checkKubHeaders(newHeaders: { key: string, value: string }[]) {
    const changes: { [key: string]: { old: string, new: string } } = {};
    let hasChanges = false;

    for (const h of newHeaders) {
      if (this.kubHeaders[h.key] !== h.value) {
        changes[h.key] = {
          old: this.kubHeaders[h.key],
          new: h.value
        };
        this.kubHeaders[h.key] = h.value;
        hasChanges = true;
      }
    }

    if (hasChanges) {
      const mapped = Object.keys(changes).map((k) => {
        let msg = `${k} `;
        if (changes[k].old) { msg += `-> ${changes[k].old} `; }
        msg += `--new-> ${changes[k].new}`;
        return msg;
      });
      this.toastSV.info(mapped.join('<hr>'), 'Kubernetes changed', { enableHtml: true });
      localStorage.setItem('kubh', JSON.stringify(this.kubHeaders));
    }
  }
}
export type KubHeaders = { [key: string]: string };
