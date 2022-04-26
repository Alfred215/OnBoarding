import { Component, ViewChild } from '@angular/core';
import { TeamDto } from '../shared/api/models';
import { TeamService } from '../shared/api/services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { ContentType } from '@ionic/cli';
import { CorsOptions } from 'cors';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  data: string;
  error: string;
  loading: any;

  item: TeamDto = {
    id: 0,
    name: '',
    league: '',
    active: true
  };

  constructor(private http: HttpClient,
    private teamSV: TeamService, public loadingController: LoadingController
  ) {
    this.data = 'Test';
    this.error = '';
  }

  async ionViewWillEnter() {
    await this.presentLoading();
    (await this.prepareDataRequest())
      .pipe(
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe(data => {
        this.data = JSON.stringify(data);
      },
        err => {
          this.error = 'Error';
        });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await this.loading.present();
  }

  private async prepareDataRequest(): Promise<Observable<object>> {
    const dataUrl = 'https://localhost:5001';
    return this.http.get(dataUrl);
  }

}

