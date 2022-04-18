import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpShareComponent } from './ep-share.component';

describe('EpShareComponent', () => {
  let component: EpShareComponent;
  let fixture: ComponentFixture<EpShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
