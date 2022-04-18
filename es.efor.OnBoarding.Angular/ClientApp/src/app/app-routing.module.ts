import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from './shared/errors/404/404.component';
import { P500Component } from './shared/errors/500/500.component';
import { TranslateGuard } from './shared/guards/translate/translate.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canLoad: [TranslateGuard]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Error 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Error 500'
    }
  },
  { path: '**', redirectTo: '/' }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

@NgModule({
  imports: [],
})
export class AppRoutingFirstRouteModule { }
