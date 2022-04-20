import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DragsItemComponent } from './drags-item.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ArrayTranslatorModule, BsDatatableModule, BsFormAutocompleteModule } from 'ax-toolbox';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {path: '', component: DragsItemComponent},
  {path: ':id', component: DragsItemComponent},
  {path: 'create',
    loadChildren: () => import('../drag-list/drags-list.module').then(m => m.DragsListModule),
    data: {
      title: 'Crear Parte'
    }
  } 
]

@NgModule({
  declarations: [DragsItemComponent],
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
export class DragsItemModule { }
