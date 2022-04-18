import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PartsListComponent } from './parts-list.component';
import { RouterModule, Routes } from '@angular/router';
import {
  BsDatatableModule, BsFormAutocompleteModule, BsModalConfirmationMessageModule,
} from 'ax-toolbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {path: '', component: PartsListComponent}
]

@NgModule({
  declarations: [PartsListComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    BsFormAutocompleteModule,
    BsDatatableModule,
    BsModalConfirmationMessageModule,
    TranslateModule,
  ],
  providers:[DatePipe]
})
export class PartsListModule { }
