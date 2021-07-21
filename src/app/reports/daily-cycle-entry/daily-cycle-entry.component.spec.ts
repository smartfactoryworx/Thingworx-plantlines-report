import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCycleEntryComponent } from './daily-cycle-entry.component';

describe('DailyCycleEntryComponent', () => {
  let component: DailyCycleEntryComponent;
  let fixture: ComponentFixture<DailyCycleEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyCycleEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCycleEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
