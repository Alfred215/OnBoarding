import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpFullscreenImgComponent } from './ep-fullscreen-img.component';

describe('EpFullscreenImgComponent', () => {
  let component: EpFullscreenImgComponent;
  let fixture: ComponentFixture<EpFullscreenImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpFullscreenImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpFullscreenImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
