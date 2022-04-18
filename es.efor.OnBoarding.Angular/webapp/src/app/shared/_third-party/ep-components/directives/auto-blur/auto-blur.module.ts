import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoBlurDirective } from './auto-blur.directive';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AutoBlurDirective],
  exports: [AutoBlurDirective],
})
export class AutoBlurModule { }
