/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CountTeamGridDtoCollectionList } from '../models/count-team-grid-dto-collection-list';
import { TeamDto } from '../models/team-dto';
import { TeamFilterDtoDatatableDto } from '../models/team-filter-dto-datatable-dto';
import { TeamGridDto } from '../models/team-grid-dto';
import { TeamGridDtoCollectionList } from '../models/team-grid-dto-collection-list';
import { TaskFilterDtoDatatableDto } from '../models/task-filter-dto-datatable-dto';
import { TaskGridPartesDtoCollectionList } from '../models/task-grid-partes-dto-collection-list';

@Injectable({
  providedIn: 'root',
})
export class PartService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiPartGetPartGet
   */
  static readonly ApiPartGetPartGetPath = '/api/Part/get_part';

  /**
   * Obtiene un parte a partir de su Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartGetPartGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartGetPartGet$Plain$Response(params?: {

    /**
     * Id del parte
     */
    id?: number;

  }): Observable<StrictHttpResponse<TeamDto>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartGetPartGetPath, 'get');
    if (params) {

      rb.query('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TeamDto>;
      })
    );
  }

  /**
   * Obtiene un parte a partir de su Id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartGetPartGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartGetPartGet$Plain(params?: {

    /**
     * Id del parte
     */
    id?: number;

  }): Observable<TeamDto> {

    return this.apiPartGetPartGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TeamDto>) => r.body as TeamDto)
    );
  }

  /**
   * Obtiene un parte a partir de su Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartGetPartGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartGetPartGet$Json$Response(params?: {

    /**
     * Id del parte
     */
    id?: number;

  }): Observable<StrictHttpResponse<TeamDto>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartGetPartGetPath, 'get');
    if (params) {

      rb.query('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TeamDto>;
      })
    );
  }

  /**
   * Obtiene un parte a partir de su Id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartGetPartGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartGetPartGet$Json(params?: {

    /**
     * Id del parte
     */
    id?: number;

  }): Observable<TeamDto> {

    return this.apiPartGetPartGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TeamDto>) => r.body as TeamDto)
    );
  }

  /**
   * Path part for operation apiPartSetPartPost
   */
  static readonly ApiPartSetPartPostPath = '/api/Part/set_part';

  /**
   * Creación/edición de un parte.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartSetPartPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPartSetPartPost$Plain$Response(params?: {
  
    /**
     * Id del parte
     */
    body?: TeamDto
  }): Observable<StrictHttpResponse<TeamGridDto>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartSetPartPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TeamGridDto>;
      })
    );
  }

  /**
   * Creación/edición de un parte.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartSetPartPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPartSetPartPost$Plain(params?: {
  
    /**
     * Id del parte
     */
    body?: TeamDto
  }): Observable<TeamGridDto> {

    return this.apiPartSetPartPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TeamGridDto>) => r.body as TeamGridDto)
    );
  }

  /**
   * Creación/edición de un parte.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartSetPartPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPartSetPartPost$Json$Response(params?: {
  
    /**
     * Id del parte
     */
    body?: TeamDto
  }): Observable<StrictHttpResponse<TeamGridDto>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartSetPartPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TeamGridDto>;
      })
    );
  }

  /**
   * Creación/edición de un parte.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartSetPartPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPartSetPartPost$Json(params?: {
  
    /**
     * Id del parte
     */
    body?: TeamDto
  }): Observable<TeamGridDto> {

    return this.apiPartSetPartPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TeamGridDto>) => r.body as TeamGridDto)
    );
  }

  /**
   * Path part for operation apiPartSelectGet
   */
  static readonly ApiPartSelectGetPath = '/api/Part/Select';

  /**
   * Select Partes.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartSelectGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartSelectGet$Plain$Response(params?: {

  }): Observable<StrictHttpResponse<TeamGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartSelectGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TeamGridDtoCollectionList>;
      })
    );
  }

  /**
   * Select Partes.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartSelectGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartSelectGet$Plain(params?: {

  }): Observable<TeamGridDtoCollectionList> {

    return this.apiPartSelectGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TeamGridDtoCollectionList>) => r.body as TeamGridDtoCollectionList)
    );
  }

  /**
   * Select Partes.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartSelectGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartSelectGet$Json$Response(params?: {

  }): Observable<StrictHttpResponse<TeamGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartSelectGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TeamGridDtoCollectionList>;
      })
    );
  }

  /**
   * Select Partes.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartSelectGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartSelectGet$Json(params?: {

  }): Observable<TeamGridDtoCollectionList> {

    return this.apiPartSelectGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TeamGridDtoCollectionList>) => r.body as TeamGridDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiPartDatatablePost
   */
  static readonly ApiPartDatatablePostPath = '/api/Part/datatable';

  /**
   * Obtiene el listado de partes de la aplicación.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartDatatablePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPartDatatablePost$Plain$Response(params?: {
      body?: TeamFilterDtoDatatableDto
  }): Observable<StrictHttpResponse<TeamGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartDatatablePostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TeamGridDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de partes de la aplicación.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartDatatablePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPartDatatablePost$Plain(params?: {
      body?: TeamFilterDtoDatatableDto
  }): Observable<TeamGridDtoCollectionList> {

    return this.apiPartDatatablePost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TeamGridDtoCollectionList>) => r.body as TeamGridDtoCollectionList)
    );
  }

  /**
   * Obtiene el listado de partes de la aplicación.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartDatatablePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPartDatatablePost$Json$Response(params?: {
      body?: TeamFilterDtoDatatableDto
  }): Observable<StrictHttpResponse<TeamGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartDatatablePostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TeamGridDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de partes de la aplicación.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartDatatablePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPartDatatablePost$Json(params?: {
      body?: TeamFilterDtoDatatableDto
  }): Observable<TeamGridDtoCollectionList> {

    return this.apiPartDatatablePost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TeamGridDtoCollectionList>) => r.body as TeamGridDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiPartListadoPartesPost
   */
  static readonly ApiPartListadoPartesPostPath = '/api/Part/ListadoPartes';

  /**
   * Obtiene el listado de partes de un alumno de la aplicación.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartListadoPartesPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoPartesPost$Plain$Response(params?: {

    /**
     * filtros de búsqueda
     */
    userId?: number;

  }): Observable<StrictHttpResponse<TeamGridDto>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartListadoPartesPostPath, 'post');
    if (params) {

      rb.query('userId', params.userId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TeamGridDto>;
      })
    );
  }

  /**
   * Obtiene el listado de partes de un alumno de la aplicación.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartListadoPartesPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoPartesPost$Plain(params?: {

    /**
     * filtros de búsqueda
     */
    userId?: number;

  }): Observable<TeamGridDto> {

    return this.apiPartListadoPartesPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TeamGridDto>) => r.body as TeamGridDto)
    );
  }

  /**
   * Obtiene el listado de partes de un alumno de la aplicación.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartListadoPartesPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoPartesPost$Json$Response(params?: {

    /**
     * filtros de búsqueda
     */
    userId?: number;

  }): Observable<StrictHttpResponse<TeamGridDto>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartListadoPartesPostPath, 'post');
    if (params) {

      rb.query('userId', params.userId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TeamGridDto>;
      })
    );
  }

  /**
   * Obtiene el listado de partes de un alumno de la aplicación.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartListadoPartesPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoPartesPost$Json(params?: {

    /**
     * filtros de búsqueda
     */
    userId?: number;

  }): Observable<TeamGridDto> {

    return this.apiPartListadoPartesPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TeamGridDto>) => r.body as TeamGridDto)
    );
  }

  /**
   * Path part for operation apiPartListadoAlumnosFechaPost
   */
  static readonly ApiPartListadoAlumnosFechaPostPath = '/api/Part/ListadoAlumnosFecha';

  /**
   * Obtiene el listado de tareas-alumnos y fecha para el tutor.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartListadoAlumnosFechaPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPartListadoAlumnosFechaPost$Plain$Response(params?: {
  
    /**
     * filtros de búsqueda
     */
    body?: TaskFilterDtoDatatableDto
  }): Observable<StrictHttpResponse<TaskGridPartesDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartListadoAlumnosFechaPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TaskGridPartesDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de tareas-alumnos y fecha para el tutor.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartListadoAlumnosFechaPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPartListadoAlumnosFechaPost$Plain(params?: {
  
    /**
     * filtros de búsqueda
     */
    body?: TaskFilterDtoDatatableDto
  }): Observable<TaskGridPartesDtoCollectionList> {

    return this.apiPartListadoAlumnosFechaPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TaskGridPartesDtoCollectionList>) => r.body as TaskGridPartesDtoCollectionList)
    );
  }

  /**
   * Obtiene el listado de tareas-alumnos y fecha para el tutor.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartListadoAlumnosFechaPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPartListadoAlumnosFechaPost$Json$Response(params?: {
  
    /**
     * filtros de búsqueda
     */
    body?: TaskFilterDtoDatatableDto
  }): Observable<StrictHttpResponse<TaskGridPartesDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartListadoAlumnosFechaPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TaskGridPartesDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de tareas-alumnos y fecha para el tutor.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartListadoAlumnosFechaPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPartListadoAlumnosFechaPost$Json(params?: {
  
    /**
     * filtros de búsqueda
     */
    body?: TaskFilterDtoDatatableDto
  }): Observable<TaskGridPartesDtoCollectionList> {

    return this.apiPartListadoAlumnosFechaPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TaskGridPartesDtoCollectionList>) => r.body as TaskGridPartesDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiPartListadoProductividadPost
   */
  static readonly ApiPartListadoProductividadPostPath = '/api/Part/ListadoProductividad';

  /**
   * Path part for operation apiPartListadoTotalesHorasPost
   */
  static readonly ApiPartListadoTotalesHorasPostPath = '/api/Part/ListadoTotalesHoras';

  /**
   * Obtiene el listado de fechas y horas totales diarias de los alumnos.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartListadoTotalesHorasPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoTotalesHorasPost$Plain$Response(params?: {

  }): Observable<StrictHttpResponse<CountTeamGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartListadoTotalesHorasPostPath, 'post');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CountTeamGridDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de fechas y horas totales diarias de los alumnos.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartListadoTotalesHorasPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoTotalesHorasPost$Plain(params?: {

  }): Observable<CountTeamGridDtoCollectionList> {

    return this.apiPartListadoTotalesHorasPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CountTeamGridDtoCollectionList>) => r.body as CountTeamGridDtoCollectionList)
    );
  }

  /**
   * Obtiene el listado de fechas y horas totales diarias de los alumnos.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartListadoTotalesHorasPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoTotalesHorasPost$Json$Response(params?: {

  }): Observable<StrictHttpResponse<CountTeamGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartListadoTotalesHorasPostPath, 'post');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CountTeamGridDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de fechas y horas totales diarias de los alumnos.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartListadoTotalesHorasPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoTotalesHorasPost$Json(params?: {

  }): Observable<CountTeamGridDtoCollectionList> {

    return this.apiPartListadoTotalesHorasPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CountTeamGridDtoCollectionList>) => r.body as CountTeamGridDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiPartTotalHourListMonthPost
   */
  static readonly ApiPartTotalHourListMonthPostPath = '/api/Part/TotalHourList_Month';

  /**
   * Obtiene el listado de fechas y horas totales diarias de los alumnos.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartTotalHourListMonthPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartTotalHourListMonthPost$Plain$Response(params?: {

  }): Observable<StrictHttpResponse<CountTeamGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartTotalHourListMonthPostPath, 'post');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CountTeamGridDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de fechas y horas totales diarias de los alumnos.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartTotalHourListMonthPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartTotalHourListMonthPost$Plain(params?: {

  }): Observable<CountTeamGridDtoCollectionList> {

    return this.apiPartTotalHourListMonthPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CountTeamGridDtoCollectionList>) => r.body as CountTeamGridDtoCollectionList)
    );
  }

  /**
   * Obtiene el listado de fechas y horas totales diarias de los alumnos.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartTotalHourListMonthPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartTotalHourListMonthPost$Json$Response(params?: {

  }): Observable<StrictHttpResponse<CountTeamGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartTotalHourListMonthPostPath, 'post');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CountTeamGridDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de fechas y horas totales diarias de los alumnos.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartTotalHourListMonthPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartTotalHourListMonthPost$Json(params?: {

  }): Observable<CountTeamGridDtoCollectionList> {

    return this.apiPartTotalHourListMonthPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CountTeamGridDtoCollectionList>) => r.body as CountTeamGridDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiPartCountTotalPartsPost
   */
  static readonly ApiPartCountTotalPartsPostPath = '/api/Part/CountTotalParts';

  /**
   * Obtiene el listado totales diarias de los alumnos.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartCountTotalPartsPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartCountTotalPartsPost$Plain$Response(params?: {

  }): Observable<StrictHttpResponse<CountTeamGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartCountTotalPartsPostPath, 'post');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CountTeamGridDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado totales diarias de los alumnos.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartCountTotalPartsPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartCountTotalPartsPost$Plain(params?: {

  }): Observable<CountTeamGridDtoCollectionList> {

    return this.apiPartCountTotalPartsPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CountTeamGridDtoCollectionList>) => r.body as CountTeamGridDtoCollectionList)
    );
  }

  /**
   * Obtiene el listado totales diarias de los alumnos.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartCountTotalPartsPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartCountTotalPartsPost$Json$Response(params?: {

  }): Observable<StrictHttpResponse<CountTeamGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartCountTotalPartsPostPath, 'post');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CountTeamGridDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado totales diarias de los alumnos.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartCountTotalPartsPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartCountTotalPartsPost$Json(params?: {

  }): Observable<CountTeamGridDtoCollectionList> {

    return this.apiPartCountTotalPartsPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CountTeamGridDtoCollectionList>) => r.body as CountTeamGridDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiPartListadoExcelFiltrosPost
   */
  static readonly ApiPartListadoExcelFiltrosPostPath = '/api/Part/ListadoExcelFiltros';

  /**
   * Obtiene excel.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartListadoExcelFiltrosPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoExcelFiltrosPost$Plain$Response(params?: {
    userId?: null | number;
    idPart?: null | number;
    date?: null | string;
    hours?: null | number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartListadoExcelFiltrosPostPath, 'post');
    if (params) {

      rb.query('userId', params.userId, {});
      rb.query('idPart', params.idPart, {});
      rb.query('date', params.date, {});
      rb.query('hours', params.hours, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Obtiene excel.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartListadoExcelFiltrosPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoExcelFiltrosPost$Plain(params?: {
    userId?: null | number;
    idPart?: null | number;
    date?: null | string;
    hours?: null | number;

  }): Observable<Blob> {

    return this.apiPartListadoExcelFiltrosPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Obtiene excel.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartListadoExcelFiltrosPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoExcelFiltrosPost$Json$Response(params?: {
    userId?: null | number;
    idPart?: null | number;
    date?: null | string;
    hours?: null | number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartListadoExcelFiltrosPostPath, 'post');
    if (params) {

      rb.query('userId', params.userId, {});
      rb.query('idPart', params.idPart, {});
      rb.query('date', params.date, {});
      rb.query('hours', params.hours, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Obtiene excel.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartListadoExcelFiltrosPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoExcelFiltrosPost$Json(params?: {
    userId?: null | number;
    idPart?: null | number;
    date?: null | string;
    hours?: null | number;

  }): Observable<Blob> {

    return this.apiPartListadoExcelFiltrosPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation apiPartListadoExcel2Get
   */
  static readonly ApiPartListadoExcel2GetPath = '/api/Part/ListadoExcel2';

  /**
   * Obtiene excel.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartListadoExcel2Get$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoExcel2Get$Plain$Response(params?: {
    userId?: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartListadoExcel2GetPath, 'get');
    if (params) {

      rb.query('userId', params.userId, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Obtiene excel.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartListadoExcel2Get$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoExcel2Get$Plain(params?: {
    userId?: number;

  }): Observable<Blob> {

    return this.apiPartListadoExcel2Get$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Obtiene excel.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartListadoExcel2Get$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoExcel2Get$Json$Response(params?: {
    userId?: number;

  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartListadoExcel2GetPath, 'get');
    if (params) {

      rb.query('userId', params.userId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Obtiene excel.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartListadoExcel2Get$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartListadoExcel2Get$Json(params?: {
    userId?: number;

  }): Observable<Blob> {

    return this.apiPartListadoExcel2Get$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation apiPartDelete
   */
  static readonly ApiPartDeletePath = '/api/Part';

  /**
   * Borra un parte.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartDelete$Plain$Response(params?: {

    /**
     * Id del parte
     */
    id?: number;

  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartDeletePath, 'delete');
    if (params) {

      rb.query('id', params.id, {});

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
   * Borra un parte.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartDelete$Plain(params?: {

    /**
     * Id del parte
     */
    id?: number;

  }): Observable<boolean> {

    return this.apiPartDelete$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Borra un parte.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPartDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartDelete$Json$Response(params?: {

    /**
     * Id del parte
     */
    id?: number;

  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.ApiPartDeletePath, 'delete');
    if (params) {

      rb.query('id', params.id, {});

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
   * Borra un parte.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPartDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPartDelete$Json(params?: {

    /**
     * Id del parte
     */
    id?: number;

  }): Observable<boolean> {

    return this.apiPartDelete$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
