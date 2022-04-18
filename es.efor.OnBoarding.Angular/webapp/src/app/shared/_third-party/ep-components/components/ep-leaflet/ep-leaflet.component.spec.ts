import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpLeafletComponent } from './ep-leaflet.component';

describe('EpLeafletComponent', () => {
  let component: EpLeafletComponent;
  let fixture: ComponentFixture<EpLeafletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpLeafletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpLeafletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
