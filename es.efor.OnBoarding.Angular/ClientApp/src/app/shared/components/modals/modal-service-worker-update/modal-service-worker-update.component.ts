import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalConfirmationMessageComponent } from '../modal-confirmation-message/modal-confirmation-message.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-service-worker-update',
  templateUrl: './modal-service-worker-update.component.html',
  styleUrls: ['./modal-service-worker-update.component.scss']
})
export class ModalServiceWorkerUpdateComponent
  extends ModalConfirmationMessageComponent
  implements OnInit
{
  @ViewChild(ModalConfirmationMessageComponent) modalConfirmation: ModalConfirmationMessageComponent;

  constructor(
    modalSV: BsModalService
  ) {
    super(modalSV);
  }

  ngOnInit(): void {
  }


  open() {
    return this.modalConfirmation.open();
  }
  close() {
    this.modalConfirmation.close();
  }
}
