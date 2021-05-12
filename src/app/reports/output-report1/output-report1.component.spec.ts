import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputReport1Component } from './output-report1.component';

describe('OutputReport1Component', () => {
  let component: OutputReport1Component;
  let fixture: ComponentFixture<OutputReport1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputReport1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputReport1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
