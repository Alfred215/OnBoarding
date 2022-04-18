import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpFullscreenImgComponent } from './ep-fullscreen-img.component';
import { EpFullscreenImgDirective } from './directives/ep-fullscreen-img.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutoBlurModule } from '../../directives/auto-blur/auto-blur.module';
import { HammerModule } from '@angular/platform-browser';

@NgModule({
  declarations: [EpFullscreenImgComponent],
  exports: [EpFullscreenImgComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AutoBlurModule,
    HammerModule,
  ]
})
export class EpFullscreenImgModule {
}
