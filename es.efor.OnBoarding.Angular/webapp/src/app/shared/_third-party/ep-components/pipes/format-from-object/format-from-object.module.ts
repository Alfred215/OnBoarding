import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatFromObjectPipe } from './format-from-object.pipe';



@NgModule({
  declarations: [FormatFromObjectPipe],
  exports: [FormatFromObjectPipe],
  imports: [
    CommonModule
  ]
})
export class FormatFromObjectModule { }
