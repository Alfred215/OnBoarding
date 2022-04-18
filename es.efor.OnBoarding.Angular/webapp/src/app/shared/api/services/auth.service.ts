/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { LoginModelDto } from '../models/login-model-dto';
import { LoginResponseDto } from '../models/login-response-dto';
import { RegisterModelDto } from '../models/register-model-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiAuthLoginPost
   */
  static readonly ApiAuthLoginPostPath = '/api/Auth/login';

  /**
   * Método del login.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthLoginPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthLoginPost$Plain$Response(params?: {
      body?: LoginModelDto
  }): Observable<StrictHttpResponse<LoginResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthLoginPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponseDto>;
      })
    );
  }

  /**
   * Método del login.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAuthLoginPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthLoginPost$Plain(params?: {
      body?: LoginModelDto
  }): Observable<LoginResponseDto> {

    return this.apiAuthLoginPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<LoginResponseDto>) => r.body as LoginResponseDto)
    );
  }

  /**
   * Método del login.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthLoginPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthLoginPost$Json$Response(params?: {
      body?: LoginModelDto
  }): Observable<StrictHttpResponse<LoginResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthLoginPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponseDto>;
      })
    );
  }

  /**
   * Método del login.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAuthLoginPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthLoginPost$Json(params?: {
      body?: LoginModelDto
  }): Observable<LoginResponseDto> {

    return this.apiAuthLoginPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<LoginResponseDto>) => r.body as LoginResponseDto)
    );
  }

  /**
   * Path part for operation apiAuthForgetPassPost
   */
  static readonly ApiAuthForgetPassPostPath = '/api/Auth/ForgetPass';

  /**
   * Método de prueba.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthForgetPassPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthForgetPassPost$Plain$Response(params?: {
    email?: null | string;
    pass?: null | string;

  }): Observable<StrictHttpResponse<LoginResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthForgetPassPostPath, 'post');
    if (params) {

      rb.query('email', params.email, {});
      rb.query('pass', params.pass, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponseDto>;
      })
    );
  }

  /**
   * Método de prueba.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAuthForgetPassPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthForgetPassPost$Plain(params?: {
    email?: null | string;
    pass?: null | string;

  }): Observable<LoginResponseDto> {

    return this.apiAuthForgetPassPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<LoginResponseDto>) => r.body as LoginResponseDto)
    );
  }

  /**
   * Método de prueba.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthForgetPassPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthForgetPassPost$Json$Response(params?: {
    email?: null | string;
    pass?: null | string;

  }): Observable<StrictHttpResponse<LoginResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthForgetPassPostPath, 'post');
    if (params) {

      rb.query('email', params.email, {});
      rb.query('pass', params.pass, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponseDto>;
      })
    );
  }

  /**
   * Método de prueba.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAuthForgetPassPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthForgetPassPost$Json(params?: {
    email?: null | string;
    pass?: null | string;

  }): Observable<LoginResponseDto> {

    return this.apiAuthForgetPassPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<LoginResponseDto>) => r.body as LoginResponseDto)
    );
  }

  /**
   * Path part for operation apiAuthRegisterPost
   */
  static readonly ApiAuthRegisterPostPath = '/api/Auth/register';

  /**
   * Metodo provisional para el registro de usuarios.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthRegisterPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthRegisterPost$Response(params?: {
      body?: RegisterModelDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthRegisterPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Metodo provisional para el registro de usuarios.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAuthRegisterPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthRegisterPost(params?: {
      body?: RegisterModelDto
  }): Observable<void> {

    return this.apiAuthRegisterPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
