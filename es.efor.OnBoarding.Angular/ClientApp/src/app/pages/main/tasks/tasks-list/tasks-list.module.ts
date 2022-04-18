import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './tasks-list.component';
import { RouterModule, Routes } from '@angular/router';
import {
  BsDatatableModule, BsModalConfirmationMessageModule,
} from 'ax-toolbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: '', component: TasksListComponent }
]

@NgModule({
  declarations: [TasksListComponent],
  imports: [
    FormsModule,
    CommonModule,
    BsDatatableModule,
    RouterModule.forChild(routes),
    BsDatatableModule,
    BsModalConfirmationMessageModule,
    TranslateModule
  ]
})
export class TasksListModule { }
