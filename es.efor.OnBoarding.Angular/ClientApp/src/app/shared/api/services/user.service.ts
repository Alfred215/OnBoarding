/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { UserDto } from '../models/user-dto';
import { UserFilterDtoDatatableDto } from '../models/user-filter-dto-datatable-dto';
import { UserGridDtoCollectionList } from '../models/user-grid-dto-collection-list';
import { UserSelectDtoCollectionList } from '../models/user-select-dto-collection-list';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiUserGetUsuarioGet
   */
  static readonly ApiUserGetUsuarioGetPath = '/api/User/get_usuario';

  /**
   * Obtiene un usuario a partir de su Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserGetUsuarioGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserGetUsuarioGet$Plain$Response(params?: {

    /**
     * Id del usuario
     */
    Id?: null | number;
    username?: null | string;

  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserGetUsuarioGetPath, 'get');
    if (params) {

      rb.query('Id', params.Id, {});
      rb.query('username', params.username, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  /**
   * Obtiene un usuario a partir de su Id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserGetUsuarioGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserGetUsuarioGet$Plain(params?: {

    /**
     * Id del usuario
     */
    Id?: null | number;
    username?: null | string;

  }): Observable<UserDto> {

    return this.apiUserGetUsuarioGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Obtiene un usuario a partir de su Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserGetUsuarioGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserGetUsuarioGet$Json$Response(params?: {

    /**
     * Id del usuario
     */
    Id?: null | number;
    username?: null | string;

  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserGetUsuarioGetPath, 'get');
    if (params) {

      rb.query('Id', params.Id, {});
      rb.query('username', params.username, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  /**
   * Obtiene un usuario a partir de su Id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserGetUsuarioGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserGetUsuarioGet$Json(params?: {

    /**
     * Id del usuario
     */
    Id?: null | number;
    username?: null | string;

  }): Observable<UserDto> {

    return this.apiUserGetUsuarioGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Path part for operation apiUserSetUsuarioPost
   */
  static readonly ApiUserSetUsuarioPostPath = '/api/User/set_usuario';

  /**
   * Guarda o modifica los datos de un usuario.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserSetUsuarioPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserSetUsuarioPost$Plain$Response(params?: {
  
    /**
     * Datos del usuarios
     */
    body?: UserDto
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserSetUsuarioPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * Guarda o modifica los datos de un usuario.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserSetUsuarioPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserSetUsuarioPost$Plain(params?: {
  
    /**
     * Datos del usuarios
     */
    body?: UserDto
  }): Observable<boolean> {

    return this.apiUserSetUsuarioPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Guarda o modifica los datos de un usuario.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserSetUsuarioPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserSetUsuarioPost$Json$Response(params?: {
  
    /**
     * Datos del usuarios
     */
    body?: UserDto
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserSetUsuarioPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * Guarda o modifica los datos de un usuario.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserSetUsuarioPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserSetUsuarioPost$Json(params?: {
  
    /**
     * Datos del usuarios
     */
    body?: UserDto
  }): Observable<boolean> {

    return this.apiUserSetUsuarioPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation apiUserSelectGet
   */
  static readonly ApiUserSelectGetPath = '/api/User/Select';

  /**
   * Select Usuarios.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserSelectGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserSelectGet$Plain$Response(params?: {
    name?: null | string;

  }): Observable<StrictHttpResponse<UserSelectDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserSelectGetPath, 'get');
    if (params) {

      rb.query('name', params.name, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserSelectDtoCollectionList>;
      })
    );
  }

  /**
   * Select Usuarios.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserSelectGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserSelectGet$Plain(params?: {
    name?: null | string;

  }): Observable<UserSelectDtoCollectionList> {

    return this.apiUserSelectGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<UserSelectDtoCollectionList>) => r.body as UserSelectDtoCollectionList)
    );
  }

  /**
   * Select Usuarios.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserSelectGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserSelectGet$Json$Response(params?: {
    name?: null | string;

  }): Observable<StrictHttpResponse<UserSelectDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserSelectGetPath, 'get');
    if (params) {

      rb.query('name', params.name, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserSelectDtoCollectionList>;
      })
    );
  }

  /**
   * Select Usuarios.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserSelectGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserSelectGet$Json(params?: {
    name?: null | string;

  }): Observable<UserSelectDtoCollectionList> {

    return this.apiUserSelectGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<UserSelectDtoCollectionList>) => r.body as UserSelectDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiUserSelectStudentGet
   */
  static readonly ApiUserSelectStudentGetPath = '/api/User/SelectStudent';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserSelectStudentGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserSelectStudentGet$Plain$Response(params?: {
    name?: null | string;

  }): Observable<StrictHttpResponse<UserSelectDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserSelectStudentGetPath, 'get');
    if (params) {

      rb.query('name', params.name, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserSelectDtoCollectionList>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserSelectStudentGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserSelectStudentGet$Plain(params?: {
    name?: null | string;

  }): Observable<UserSelectDtoCollectionList> {

    return this.apiUserSelectStudentGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<UserSelectDtoCollectionList>) => r.body as UserSelectDtoCollectionList)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserSelectStudentGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserSelectStudentGet$Json$Response(params?: {
    name?: null | string;

  }): Observable<StrictHttpResponse<UserSelectDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserSelectStudentGetPath, 'get');
    if (params) {

      rb.query('name', params.name, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserSelectDtoCollectionList>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserSelectStudentGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserSelectStudentGet$Json(params?: {
    name?: null | string;

  }): Observable<UserSelectDtoCollectionList> {

    return this.apiUserSelectStudentGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<UserSelectDtoCollectionList>) => r.body as UserSelectDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiUserSelectTutorGet
   */
  static readonly ApiUserSelectTutorGetPath = '/api/User/SelectTutor';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserSelectTutorGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserSelectTutorGet$Plain$Response(params?: {
    name?: null | string;

  }): Observable<StrictHttpResponse<UserSelectDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserSelectTutorGetPath, 'get');
    if (params) {

      rb.query('name', params.name, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserSelectDtoCollectionList>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserSelectTutorGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserSelectTutorGet$Plain(params?: {
    name?: null | string;

  }): Observable<UserSelectDtoCollectionList> {

    return this.apiUserSelectTutorGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<UserSelectDtoCollectionList>) => r.body as UserSelectDtoCollectionList)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserSelectTutorGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserSelectTutorGet$Json$Response(params?: {
    name?: null | string;

  }): Observable<StrictHttpResponse<UserSelectDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserSelectTutorGetPath, 'get');
    if (params) {

      rb.query('name', params.name, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserSelectDtoCollectionList>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserSelectTutorGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserSelectTutorGet$Json(params?: {
    name?: null | string;

  }): Observable<UserSelectDtoCollectionList> {

    return this.apiUserSelectTutorGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<UserSelectDtoCollectionList>) => r.body as UserSelectDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiUserDatatablePost
   */
  static readonly ApiUserDatatablePostPath = '/api/User/datatable';

  /**
   * Obtiene el listado de usuarios de la aplicación.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserDatatablePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserDatatablePost$Plain$Response(params?: {
  
    /**
     * filtros de búsqueda
     */
    body?: UserFilterDtoDatatableDto
  }): Observable<StrictHttpResponse<UserGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserDatatablePostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserGridDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de usuarios de la aplicación.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserDatatablePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserDatatablePost$Plain(params?: {
  
    /**
     * filtros de búsqueda
     */
    body?: UserFilterDtoDatatableDto
  }): Observable<UserGridDtoCollectionList> {

    return this.apiUserDatatablePost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<UserGridDtoCollectionList>) => r.body as UserGridDtoCollectionList)
    );
  }

  /**
   * Obtiene el listado de usuarios de la aplicación.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserDatatablePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserDatatablePost$Json$Response(params?: {
  
    /**
     * filtros de búsqueda
     */
    body?: UserFilterDtoDatatableDto
  }): Observable<StrictHttpResponse<UserGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserDatatablePostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserGridDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de usuarios de la aplicación.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserDatatablePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUserDatatablePost$Json(params?: {
  
    /**
     * filtros de búsqueda
     */
    body?: UserFilterDtoDatatableDto
  }): Observable<UserGridDtoCollectionList> {

    return this.apiUserDatatablePost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<UserGridDtoCollectionList>) => r.body as UserGridDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiUserDelete
   */
  static readonly ApiUserDeletePath = '/api/User/ ';

  /**
   * Muestra/oculta un usuario.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserDelete$Plain$Response(params?: {

    /**
     * Id del usuario
     */
    Id?: null | number;
    Mostrar?: boolean;

  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserDeletePath, 'delete');
    if (params) {

      rb.query('Id', params.Id, {});
      rb.query('Mostrar', params.Mostrar, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * Muestra/oculta un usuario.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserDelete$Plain(params?: {

    /**
     * Id del usuario
     */
    Id?: null | number;
    Mostrar?: boolean;

  }): Observable<boolean> {

    return this.apiUserDelete$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Muestra/oculta un usuario.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserDelete$Json$Response(params?: {

    /**
     * Id del usuario
     */
    Id?: null | number;
    Mostrar?: boolean;

  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserDeletePath, 'delete');
    if (params) {

      rb.query('Id', params.Id, {});
      rb.query('Mostrar', params.Mostrar, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * Muestra/oculta un usuario.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserDelete$Json(params?: {

    /**
     * Id del usuario
     */
    Id?: null | number;
    Mostrar?: boolean;

  }): Observable<boolean> {

    return this.apiUserDelete$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation apiUserUserLoggedGet
   */
  static readonly ApiUserUserLoggedGetPath = '/api/User/UserLogged';

  /**
   * Muestra/oculta un usuario.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserUserLoggedGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserUserLoggedGet$Plain$Response(params?: {

  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserUserLoggedGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  /**
   * Muestra/oculta un usuario.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserUserLoggedGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserUserLoggedGet$Plain(params?: {

  }): Observable<UserDto> {

    return this.apiUserUserLoggedGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * Muestra/oculta un usuario.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUserUserLoggedGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserUserLoggedGet$Json$Response(params?: {

  }): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ApiUserUserLoggedGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  /**
   * Muestra/oculta un usuario.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUserUserLoggedGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUserUserLoggedGet$Json(params?: {

  }): Observable<UserDto> {

    return this.apiUserUserLoggedGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

}
