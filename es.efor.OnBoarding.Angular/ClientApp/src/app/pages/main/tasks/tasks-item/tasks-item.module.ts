import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksItemComponent } from './tasks-item.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArrayTranslatorModule, BsDatatableModule, BsFormAutocompleteModule } from 'ax-toolbox';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {path: '', component: TasksItemComponent},
  {path: ':id', component: TasksItemComponent}
]

@NgModule({
  declarations: [TasksItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    BsDatatableModule,
    BsFormAutocompleteModule,
    ArrayTranslatorModule,
    ToastrModule,
    TranslateModule   
  ]
})
export class TasksItemModule { }
