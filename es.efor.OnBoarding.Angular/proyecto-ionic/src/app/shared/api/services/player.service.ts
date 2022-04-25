/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PlayerDto } from '../models/player-dto';
import { PlayerFilterDtoDatatableDto } from '../models/player-filter-dto-datatable-dto';
import { PlayerGridDto } from '../models/player-grid-dto';
import { PlayerGridDtoCollectionList } from '../models/player-grid-dto-collection-list';

@Injectable({
  providedIn: 'root',
})
export class PlayerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiPlayerGetGet
   */
  static readonly ApiPlayerGetGetPath = '/api/Player/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayerGetGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayerGetGet$Plain$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<PlayerDto>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.ApiPlayerGetGetPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PlayerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayerGetGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayerGetGet$Plain(params?: {
    id?: number;
  }): Observable<PlayerDto> {

    return this.apiPlayerGetGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PlayerDto>) => r.body as PlayerDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayerGetGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayerGetGet$Json$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<PlayerDto>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.ApiPlayerGetGetPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PlayerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayerGetGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayerGetGet$Json(params?: {
    id?: number;
  }): Observable<PlayerDto> {

    return this.apiPlayerGetGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<PlayerDto>) => r.body as PlayerDto)
    );
  }

  /**
   * Path part for operation apiPlayerSelectPost
   */
  static readonly ApiPlayerSelectPostPath = '/api/Player/select';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayerSelectPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayerSelectPost$Plain$Response(params?: {
    nombre?: string;
  }): Observable<StrictHttpResponse<Array<PlayerGridDto>>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.ApiPlayerSelectPostPath, 'post');
    if (params) {
      rb.query('nombre', params.nombre, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PlayerGridDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayerSelectPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayerSelectPost$Plain(params?: {
    nombre?: string;
  }): Observable<Array<PlayerGridDto>> {

    return this.apiPlayerSelectPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PlayerGridDto>>) => r.body as Array<PlayerGridDto>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayerSelectPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayerSelectPost$Json$Response(params?: {
    nombre?: string;
  }): Observable<StrictHttpResponse<Array<PlayerGridDto>>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.ApiPlayerSelectPostPath, 'post');
    if (params) {
      rb.query('nombre', params.nombre, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PlayerGridDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayerSelectPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayerSelectPost$Json(params?: {
    nombre?: string;
  }): Observable<Array<PlayerGridDto>> {

    return this.apiPlayerSelectPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PlayerGridDto>>) => r.body as Array<PlayerGridDto>)
    );
  }

  /**
   * Path part for operation apiPlayerCreatePost
   */
  static readonly ApiPlayerCreatePostPath = '/api/Player/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayerCreatePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayerCreatePost$Plain$Response(params?: {
    body?: PlayerDto
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.ApiPlayerCreatePostPath, 'post');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayerCreatePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayerCreatePost$Plain(params?: {
    body?: PlayerDto
  }): Observable<boolean> {

    return this.apiPlayerCreatePost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayerCreatePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayerCreatePost$Json$Response(params?: {
    body?: PlayerDto
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.ApiPlayerCreatePostPath, 'post');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayerCreatePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayerCreatePost$Json(params?: {
    body?: PlayerDto
  }): Observable<boolean> {

    return this.apiPlayerCreatePost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation apiPlayerDatatablePost
   */
  static readonly ApiPlayerDatatablePostPath = '/api/Player/datatable';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayerDatatablePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayerDatatablePost$Plain$Response(params?: {
    body?: PlayerFilterDtoDatatableDto
  }): Observable<StrictHttpResponse<PlayerGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.ApiPlayerDatatablePostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PlayerGridDtoCollectionList>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayerDatatablePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayerDatatablePost$Plain(params?: {
    body?: PlayerFilterDtoDatatableDto
  }): Observable<PlayerGridDtoCollectionList> {

    return this.apiPlayerDatatablePost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PlayerGridDtoCollectionList>) => r.body as PlayerGridDtoCollectionList)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayerDatatablePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayerDatatablePost$Json$Response(params?: {
    body?: PlayerFilterDtoDatatableDto
  }): Observable<StrictHttpResponse<PlayerGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.ApiPlayerDatatablePostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PlayerGridDtoCollectionList>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayerDatatablePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayerDatatablePost$Json(params?: {
    body?: PlayerFilterDtoDatatableDto
  }): Observable<PlayerGridDtoCollectionList> {

    return this.apiPlayerDatatablePost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<PlayerGridDtoCollectionList>) => r.body as PlayerGridDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiPlayerPost
   */
  static readonly ApiPlayerPostPath = '/api/Player';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayerPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayerPost$Plain$Response(params?: {
    body?: PlayerDto
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.ApiPlayerPostPath, 'post');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayerPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayerPost$Plain(params?: {
    body?: PlayerDto
  }): Observable<boolean> {

    return this.apiPlayerPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayerPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayerPost$Json$Response(params?: {
    body?: PlayerDto
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.ApiPlayerPostPath, 'post');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayerPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayerPost$Json(params?: {
    body?: PlayerDto
  }): Observable<boolean> {

    return this.apiPlayerPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation apiPlayerDelete
   */
  static readonly ApiPlayerDeletePath = '/api/Player';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayerDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayerDelete$Plain$Response(params?: {
    Id?: number;
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.ApiPlayerDeletePath, 'delete');
    if (params) {
      rb.query('Id', params.Id, {});
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayerDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayerDelete$Plain(params?: {
    Id?: number;
  }): Observable<boolean> {

    return this.apiPlayerDelete$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayerDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayerDelete$Json$Response(params?: {
    Id?: number;
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.ApiPlayerDeletePath, 'delete');
    if (params) {
      rb.query('Id', params.Id, {});
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayerDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayerDelete$Json(params?: {
    Id?: number;
  }): Observable<boolean> {

    return this.apiPlayerDelete$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
