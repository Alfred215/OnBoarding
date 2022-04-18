import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoveryComponent } from './recovery.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ArrayTranslatorModule } from 'ax-toolbox';

const routes: Routes = [
  { path: '', component: RecoveryComponent}
]

@NgModule({
  declarations: [RecoveryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FontAwesomeModule,
    TranslateModule.forChild(),
    ArrayTranslatorModule
  ]
})
export class RecoveryModule { }
