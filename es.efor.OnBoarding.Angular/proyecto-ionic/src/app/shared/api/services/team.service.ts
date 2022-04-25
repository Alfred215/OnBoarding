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

import { TeamDto } from '../models/team-dto';
import { TeamFilterDtoDatatableDto } from '../models/team-filter-dto-datatable-dto';
import { TeamGridDto } from '../models/team-grid-dto';
import { TeamGridDtoCollectionList } from '../models/team-grid-dto-collection-list';

@Injectable({
  providedIn: 'root',
})
export class TeamService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiTeamGetGet
   */
  static readonly ApiTeamGetGetPath = '/api/Team/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTeamGetGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTeamGetGet$Plain$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<TeamDto>> {

    const rb = new RequestBuilder(this.rootUrl, TeamService.ApiTeamGetGetPath, 'get');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTeamGetGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTeamGetGet$Plain(params?: {
    id?: number;
  }): Observable<TeamDto> {

    return this.apiTeamGetGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TeamDto>) => r.body as TeamDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTeamGetGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTeamGetGet$Json$Response(params?: {
    id?: number;
  }): Observable<StrictHttpResponse<TeamDto>> {

    const rb = new RequestBuilder(this.rootUrl, TeamService.ApiTeamGetGetPath, 'get');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTeamGetGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTeamGetGet$Json(params?: {
    id?: number;
  }): Observable<TeamDto> {

    return this.apiTeamGetGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TeamDto>) => r.body as TeamDto)
    );
  }

  /**
   * Path part for operation apiTeamSelectPost
   */
  static readonly ApiTeamSelectPostPath = '/api/Team/select';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTeamSelectPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTeamSelectPost$Plain$Response(params?: {
    nombre?: string;
  }): Observable<StrictHttpResponse<Array<TeamGridDto>>> {

    const rb = new RequestBuilder(this.rootUrl, TeamService.ApiTeamSelectPostPath, 'post');
    if (params) {
      rb.query('nombre', params.nombre, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TeamGridDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTeamSelectPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTeamSelectPost$Plain(params?: {
    nombre?: string;
  }): Observable<Array<TeamGridDto>> {

    return this.apiTeamSelectPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TeamGridDto>>) => r.body as Array<TeamGridDto>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTeamSelectPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTeamSelectPost$Json$Response(params?: {
    nombre?: string;
  }): Observable<StrictHttpResponse<Array<TeamGridDto>>> {

    const rb = new RequestBuilder(this.rootUrl, TeamService.ApiTeamSelectPostPath, 'post');
    if (params) {
      rb.query('nombre', params.nombre, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TeamGridDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTeamSelectPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTeamSelectPost$Json(params?: {
    nombre?: string;
  }): Observable<Array<TeamGridDto>> {

    return this.apiTeamSelectPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TeamGridDto>>) => r.body as Array<TeamGridDto>)
    );
  }

  /**
   * Path part for operation apiTeamCreatePost
   */
  static readonly ApiTeamCreatePostPath = '/api/Team/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTeamCreatePost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTeamCreatePost$Response(params?: {
    body?: TeamDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TeamService.ApiTeamCreatePostPath, 'post');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTeamCreatePost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTeamCreatePost(params?: {
    body?: TeamDto
  }): Observable<void> {

    return this.apiTeamCreatePost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiTeamDatatablePost
   */
  static readonly ApiTeamDatatablePostPath = '/api/Team/datatable';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTeamDatatablePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTeamDatatablePost$Plain$Response(params?: {
    body?: TeamFilterDtoDatatableDto
  }): Observable<StrictHttpResponse<TeamGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, TeamService.ApiTeamDatatablePostPath, 'post');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTeamDatatablePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTeamDatatablePost$Plain(params?: {
    body?: TeamFilterDtoDatatableDto
  }): Observable<TeamGridDtoCollectionList> {

    return this.apiTeamDatatablePost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TeamGridDtoCollectionList>) => r.body as TeamGridDtoCollectionList)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTeamDatatablePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTeamDatatablePost$Json$Response(params?: {
    body?: TeamFilterDtoDatatableDto
  }): Observable<StrictHttpResponse<TeamGridDtoCollectionList>> {

    const rb = new RequestBuilder(this.rootUrl, TeamService.ApiTeamDatatablePostPath, 'post');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTeamDatatablePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTeamDatatablePost$Json(params?: {
    body?: TeamFilterDtoDatatableDto
  }): Observable<TeamGridDtoCollectionList> {

    return this.apiTeamDatatablePost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TeamGridDtoCollectionList>) => r.body as TeamGridDtoCollectionList)
    );
  }

  /**
   * Path part for operation apiTeamPost
   */
  static readonly ApiTeamPostPath = '/api/Team';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTeamPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTeamPost$Plain$Response(params?: {
    body?: TeamDto
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, TeamService.ApiTeamPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiTeamPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTeamPost$Plain(params?: {
    body?: TeamDto
  }): Observable<boolean> {

    return this.apiTeamPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTeamPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTeamPost$Json$Response(params?: {
    body?: TeamDto
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, TeamService.ApiTeamPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiTeamPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTeamPost$Json(params?: {
    body?: TeamDto
  }): Observable<boolean> {

    return this.apiTeamPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation apiTeamDelete
   */
  static readonly ApiTeamDeletePath = '/api/Team';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTeamDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTeamDelete$Plain$Response(params?: {
    Id?: number;
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, TeamService.ApiTeamDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiTeamDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTeamDelete$Plain(params?: {
    Id?: number;
  }): Observable<boolean> {

    return this.apiTeamDelete$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTeamDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTeamDelete$Json$Response(params?: {
    Id?: number;
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, TeamService.ApiTeamDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiTeamDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTeamDelete$Json(params?: {
    Id?: number;
  }): Observable<boolean> {

    return this.apiTeamDelete$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
