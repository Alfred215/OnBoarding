/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { TaskDto } from '../models/task-dto';
import { TaskFilterTableDtoDatatableDto } from '../models/task-filter-table-dto-datatable-dto';
import { TaskGridDtoCollectionList } from '../models/task-grid-dto-collection-list';
import { TaskSelectDtoCollectionList } from '../models/task-select-dto-collection-list';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiTaskGetTaskGet
   */
  static readonly ApiTaskGetTaskGetPath = '/api/Task/get_task';

  /**
   * Obtiene una tarea a partir de su Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTaskGetTaskGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTaskGetTaskGet$Plain$Response(params?: {

    /**
     * Id de la tarea
     */
    id?: null | number;

  }): Observable<StrictHttpResponse<TaskDto>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ApiTaskGetTaskGetPath, 'get');
    if (params) {

      rb.query('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TaskDto>;
      })
    );
  }

  /**
   * Obtiene una tarea a partir de su Id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTaskGetTaskGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTaskGetTaskGet$Plain(params?: {

    /**
     * Id de la tarea
     */
    id?: null | number;

  }): Observable<TaskDto> {

    return this.apiTaskGetTaskGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TaskDto>) => r.body as TaskDto)
    );
  }

  /**
   * Obtiene una tarea a partir de su Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTaskGetTaskGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTaskGetTaskGet$Json$Response(params?: {

    /**
     * Id de la tarea
     */
    id?: null | number;

  }): Observable<StrictHttpResponse<TaskDto>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ApiTaskGetTaskGetPath, 'get');
    if (params) {

      rb.query('id', params.id, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TaskDto>;
      })
    );
  }

  /**
   * Obtiene una tarea a partir de su Id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTaskGetTaskGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTaskGetTaskGet$Json(params?: {

    /**
     * Id de la tarea
     */
    id?: null | number;

  }): Observable<TaskDto> {

    return this.apiTaskGetTaskGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TaskDto>) => r.body as TaskDto)
    );
  }

  /**
   * Path part for operation apiTaskSetTaskPost
   */
  static readonly ApiTaskSetTaskPostPath = '/api/Task/set_task';

  /**
   * Creación/edición de una tarea.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTaskSetTaskPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTaskSetTaskPost$Plain$Response(params?: {
  
    /**
     * Id de la tarea
     */
    body?: TaskDto
  }): Observable<StrictHttpResponse<TaskDto>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ApiTaskSetTaskPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TaskDto>;
      })
    );
  }

  /**
   * Creación/edición de una tarea.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTaskSetTaskPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTaskSetTaskPost$Plain(params?: {
  
    /**
     * Id de la tarea
     */
    body?: TaskDto
  }): Observable<TaskDto> {

    return this.apiTaskSetTaskPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TaskDto>) => r.body as TaskDto)
    );
  }

  /**
   * Creación/edición de una tarea.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTaskSetTaskPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTaskSetTaskPost$Json$Response(params?: {
  
    /**
     * Id de la tarea
     */
    body?: TaskDto
  }): Observable<StrictHttpResponse<TaskDto>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ApiTaskSetTaskPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TaskDto>;
      })
    );
  }

  /**
   * Creación/edición de una tarea.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTaskSetTaskPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTaskSetTaskPost$Json(params?: {
  
    /**
     * Id de la tarea
     */
    body?: TaskDto
  }): Observable<TaskDto> {

    return this.apiTaskSetTaskPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TaskDto>) => r.body as TaskDto)
    );
  }

  /**
   * Path part for operation apiTaskDatatablePost
   */
  static readonly ApiTaskDatatablePostPath = '/api/Task/datatable';

  /**
   * Obtiene el listado de tareas de la aplicación.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTaskDatatablePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTaskDatatablePost$Plain$Response(params?: {
      body?: TaskFilterTableDtoDatatableDto
  }): Observable<StrictHttpResponse<TaskGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ApiTaskDatatablePostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TaskGridDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de tareas de la aplicación.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTaskDatatablePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTaskDatatablePost$Plain(params?: {
      body?: TaskFilterTableDtoDatatableDto
  }): Observable<TaskGridDtoCollectionList> {

    return this.apiTaskDatatablePost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TaskGridDtoCollectionList>) => r.body as TaskGridDtoCollectionList)
    );
  }

  /**
   * Obtiene el listado de tareas de la aplicación.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTaskDatatablePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTaskDatatablePost$Json$Response(params?: {
      body?: TaskFilterTableDtoDatatableDto
  }): Observable<StrictHttpResponse<TaskGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ApiTaskDatatablePostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TaskGridDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de tareas de la aplicación.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTaskDatatablePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTaskDatatablePost$Json(params?: {
      body?: TaskFilterTableDtoDatatableDto
  }): Observable<TaskGridDtoCollectionList> {

    return this.apiTaskDatatablePost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TaskGridDtoCollectionList>) => r.body as TaskGridDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiTaskSelecttaskGet
   */
  static readonly ApiTaskSelecttaskGetPath = '/api/Task/selecttask';

  /**
   * Obtiene el listado de tareas de la aplicación.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTaskSelecttaskGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTaskSelecttaskGet$Plain$Response(params?: {
    name?: null | string;

  }): Observable<StrictHttpResponse<TaskSelectDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ApiTaskSelecttaskGetPath, 'get');
    if (params) {

      rb.query('name', params.name, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TaskSelectDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de tareas de la aplicación.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTaskSelecttaskGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTaskSelecttaskGet$Plain(params?: {
    name?: null | string;

  }): Observable<TaskSelectDtoCollectionList> {

    return this.apiTaskSelecttaskGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TaskSelectDtoCollectionList>) => r.body as TaskSelectDtoCollectionList)
    );
  }

  /**
   * Obtiene el listado de tareas de la aplicación.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTaskSelecttaskGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTaskSelecttaskGet$Json$Response(params?: {
    name?: null | string;

  }): Observable<StrictHttpResponse<TaskSelectDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ApiTaskSelecttaskGetPath, 'get');
    if (params) {

      rb.query('name', params.name, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TaskSelectDtoCollectionList>;
      })
    );
  }

  /**
   * Obtiene el listado de tareas de la aplicación.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTaskSelecttaskGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTaskSelecttaskGet$Json(params?: {
    name?: null | string;

  }): Observable<TaskSelectDtoCollectionList> {

    return this.apiTaskSelecttaskGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TaskSelectDtoCollectionList>) => r.body as TaskSelectDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiTaskDelete
   */
  static readonly ApiTaskDeletePath = '/api/Task';

  /**
   * Borra una tarea.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTaskDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTaskDelete$Plain$Response(params?: {

    /**
     * Identificacion de la tarea
     */
    id?: number;

  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ApiTaskDeletePath, 'delete');
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
   * Borra una tarea.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTaskDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTaskDelete$Plain(params?: {

    /**
     * Identificacion de la tarea
     */
    id?: number;

  }): Observable<boolean> {

    return this.apiTaskDelete$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Borra una tarea.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTaskDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTaskDelete$Json$Response(params?: {

    /**
     * Identificacion de la tarea
     */
    id?: number;

  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, TaskService.ApiTaskDeletePath, 'delete');
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
   * Borra una tarea.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTaskDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTaskDelete$Json(params?: {

    /**
     * Identificacion de la tarea
     */
    id?: number;

  }): Observable<boolean> {

    return this.apiTaskDelete$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
