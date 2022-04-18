import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServiceWorkerUpdateComponent } from './modal-service-worker-update.component';

describe('ModalServiceWorkerUpdateComponent', () => {
  let component: ModalServiceWorkerUpdateComponent;
  let fixture: ComponentFixture<ModalServiceWorkerUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalServiceWorkerUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalServiceWorkerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
