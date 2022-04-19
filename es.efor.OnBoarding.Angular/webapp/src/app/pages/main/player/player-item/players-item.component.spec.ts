import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsItemComponent } from './players-item.component';

describe('PartsItemComponent', () => {
  let component: PartsItemComponent;
  let fixture: ComponentFixture<PartsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
