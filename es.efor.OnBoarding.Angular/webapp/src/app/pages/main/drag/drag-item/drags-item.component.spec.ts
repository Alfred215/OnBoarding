import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragsItemComponent } from './drags-item.component';

describe('DragsItemComponent', () => {
  let component: DragsItemComponent;
  let fixture: ComponentFixture<DragsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
