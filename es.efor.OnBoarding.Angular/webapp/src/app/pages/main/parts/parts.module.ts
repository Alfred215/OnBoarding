import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    loadChildren: () => import('./parts-list/parts-list.module').then(m => m.PartsListModule),
    data: {
      title: 'Listado '
    }
  },
  {
    path: 'new',
    loadChildren: () => import('./parts-item/parts-item.module').then(m => m.PartsItemModule),
    data: {
      title: 'Nuevo Parte'
    }
  },
  {
    path: 'edit',
    loadChildren: () => import('./parts-item/parts-item.module').then(m => m.PartsItemModule),
    data: {
      title: 'Editar Parte'
    }
  },
  {
    path: 'search',
    loadChildren: () => import('./parts-item/parts-item.module').then(m => m.PartsItemModule),
    data: {
      title: 'Buscar'
    }
  }

];

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    
  ]
})
export class PartsModule { }
