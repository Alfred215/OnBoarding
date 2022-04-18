import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsTabOrderDirective } from './bs-tab-order.directive';



@NgModule({
  declarations: [BsTabOrderDirective],
  exports: [BsTabOrderDirective],
  imports: [
    CommonModule
  ]
})
export class BsTabOrderModule { }
