import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TranslateGuard } from '../shared/guards/translate/translate.guard';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
const routes: Routes = [
  /** Authentication layout */
  
  /** Main layout */
  {
    path: '', component: MainComponent,
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    //canLoad: [TranslateGuard, AuthGuard], canActivate: [],
    data: {
      title: "",
      policy: []
      //policy: PolicyMenu.PolicyMenuPost
    }
  },
];

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
  ]
})
export class PagesModule { }
