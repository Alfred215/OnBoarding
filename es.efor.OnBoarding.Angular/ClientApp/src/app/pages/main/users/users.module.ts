import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', loadChildren: () => import('./users-list/users-list.module').then(m => m.UsersListModule),
  data: {
    title: 'Listado'
  }  
},
{ path: 'new',
  loadChildren: () => import('./users-item/users-item.module').then(m => m.UsersItemModule),
  data: {
    title: 'Nuevo Usuario'
  }
},
{ path: 'edit',
  loadChildren: () => import('./users-item/users-item.module').then(m => m.UsersItemModule),
  data: {
    title: 'Editar Usuario'
  }
}
];




@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
