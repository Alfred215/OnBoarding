import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list',
  loadChildren: () => import('./tasks-list/tasks-list.module').then(m => m.TasksListModule),
  data: {
    title: 'Listado'
  }  
},
{ path: 'new',
  loadChildren: () => import('./tasks-item/tasks-item.module').then(m => m.TasksItemModule),
  data: {
    title: 'Nueva Tarea'
  }
},
{ path: 'edit',
  loadChildren: () => import('./tasks-item/tasks-item.module').then(m => m.TasksItemModule),
  data: {
    title: 'Editar Tarea'
  }
}

];


@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TasksModule { }
