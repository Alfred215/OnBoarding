import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArrayTranslatorModule, BsFormAutocompleteModule, BsFormInputModule } from 'ax-toolbox';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '', component: HomeComponent,
    data: {
      title: 'Charts'
    }
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    ToastrModule,
    FontAwesomeModule,
    ArrayTranslatorModule,
    FormsModule,
    BsFormAutocompleteModule,
    BsFormInputModule,
    FullCalendarModule,
    ChartsModule
  ]
})
export class HomeModule { }
