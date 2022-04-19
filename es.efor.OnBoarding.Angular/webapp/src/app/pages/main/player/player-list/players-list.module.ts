import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PlayersListComponent } from './players-list.component';
import { RouterModule, Routes } from '@angular/router';
import {
  BsDatatableModule, BsFormAutocompleteModule, BsModalConfirmationMessageModule,
} from 'ax-toolbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {path: '', component: PlayersListComponent}
]

@NgModule({
  declarations: [PlayersListComponent],
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
export class PlayersListModule { }
