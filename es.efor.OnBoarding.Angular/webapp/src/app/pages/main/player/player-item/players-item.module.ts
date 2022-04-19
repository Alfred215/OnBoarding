import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PartsItemComponent } from './players-item.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ArrayTranslatorModule, BsDatatableModule, BsFormAutocompleteModule } from 'ax-toolbox';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {path: '', component: PartsItemComponent},
  {path: ':id', component: PartsItemComponent},
  {path: 'create',
    loadChildren: () => import('../player-list/players-list.module').then(m => m.PartsListModule),
    data: {
      title: 'Crear Parte'
    }
  } 
]

@NgModule({
  declarations: [PartsItemComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    BsDatatableModule,
    BsFormAutocompleteModule,
    ArrayTranslatorModule,
    ToastrModule,
    TranslateModule   
  ],
  providers:[DatePipe]
})
export class PartsItemModule { }
