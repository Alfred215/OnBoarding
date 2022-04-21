import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PlayersItemComponent } from './players-item.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ArrayTranslatorModule, BsDatatableModule, BsFormAutocompleteModule } from 'ax-toolbox';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

const routes: Routes = [
  {path: '', component: PlayersItemComponent},
  {path: ':id', component: PlayersItemComponent},
  {path: 'create',
    loadChildren: () => import('../player-list/players-list.module').then(m => m.PlayersListModule),
    data: {
      title: 'Crear Parte'
    }
  } 
]

@NgModule({
  declarations: [PlayersItemComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    BsDatatableModule,
    BsFormAutocompleteModule,
    ArrayTranslatorModule,
    ToastrModule,
    TranslateModule,
    DragDropModule   
  ],
  providers:[DatePipe]
})
export class PlayersItemModule { }
