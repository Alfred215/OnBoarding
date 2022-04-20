import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragsListComponent } from './drags-list.component';

describe('PartsListComponent', () => {
  let component: DragsListComponent;
  let fixture: ComponentFixture<DragsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
