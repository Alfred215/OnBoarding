import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersItemComponent } from './users-item.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { ArrayTranslatorModule } from 'ax-toolbox';

const routes: Routes = [
  {path: '', component: UsersItemComponent},
  {path: ':username', component: UsersItemComponent}
]

@NgModule({
  declarations: [UsersItemComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    TranslateModule,
    ArrayTranslatorModule
  ]
})
export class UsersItemModule { }
