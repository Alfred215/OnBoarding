import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { BsMenuModule } from 'ax-toolbox';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { MainComponent } from './main.component';
import { FormsModule } from '@angular/forms';
import {
  AppAsideModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BreadcrumbModule } from 'src/app/shared/components/breadcrumb/breadcrumb.module';
import { Roles } from 'src/app/shared/models/enums/role.enum';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
defineLocale('es', esLocale);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule),
    canActivate: [], canLoad: [],
    data: {
      title: 'Error',
      policy: []
    }
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: {
      title: 'Home',
      policy: []
    }
  },
  {
    path: 'team',
    loadChildren: () => import('./parts/parts.module').then(m => m.PartsModule),
    data: {
      title: 'Equipos'
    }
  },
  {
    path: 'player',
    loadChildren: () => import('./player/players.module').then(m => m.PlayersModule),
    data: {
      title: 'Jugadores'
    }
  },
  {
    path: 'drag',
    loadChildren: () => import('./drag/drag.module').then(m => m.DragsModule),
    data: {
      title: 'Cambiar'
    }
  }
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    FontAwesomeModule,
    BsDropdownModule,
    BsMenuModule,
    AppAsideModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    BreadcrumbModule,
   
    
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
  ]
})
export class MainModule { }
