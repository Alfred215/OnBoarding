import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDatatableModule } from 'ax-toolbox';
import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  { path: '', component: UsersListComponent},
  {
    path: '', component: UsersListComponent,
    data: {
      title: 'Charts'
    }
  }
]

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    BsDatatableModule,
    TranslateModule,
    ChartsModule
  ]
})
export class UsersListModule { }
