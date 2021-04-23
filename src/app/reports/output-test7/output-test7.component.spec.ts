import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputTest7Component } from './output-test7.component';

describe('OutputTest7Component', () => {
  let component: OutputTest7Component;
  let fixture: ComponentFixture<OutputTest7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputTest7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputTest7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
