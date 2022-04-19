import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    loadChildren: () => import('./player-list/players-list.module').then(m => m.PlayersListModule),
    data: {
      title: 'Listado '
    }
  },
  {
    path: 'new',
    loadChildren: () => import('./player-item/players-item.module').then(m => m.PlayersItemModule),
    data: {
      title: 'Nuevo Parte'
    }
  },
  {
    path: 'edit',
    loadChildren: () => import('./player-item/players-item.module').then(m => m.PlayersItemModule),
    data: {
      title: 'Editar Parte'
    }
  },
  {
    path: 'search',
    loadChildren: () => import('./player-item/players-item.module').then(m => m.PlayersItemModule),
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
