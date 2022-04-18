import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalToStringPipe } from './decimal-to-string.pipe';
import { ReplacePipe } from '../replace/replace.pipe';



@NgModule({
  declarations: [DecimalToStringPipe],
  exports: [DecimalToStringPipe],
  imports: [],
  providers: [ReplacePipe]
})
export class DecimalToStringModule { }
