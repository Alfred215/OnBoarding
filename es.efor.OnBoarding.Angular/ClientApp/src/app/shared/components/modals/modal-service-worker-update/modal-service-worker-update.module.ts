import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalServiceWorkerUpdateComponent } from './modal-service-worker-update.component';
import { ModalConfirmationMessageModule } from '../modal-confirmation-message/modal-confirmation-message.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ModalServiceWorkerUpdateComponent],
  exports: [ModalServiceWorkerUpdateComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ModalConfirmationMessageModule,
  ]
})
export class ModalServiceWorkerUpdateModule { }
