import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentMasterComponent } from './parent-master.component';

describe('ParentMasterComponent', () => {
  let component: ParentMasterComponent;
  let fixture: ComponentFixture<ParentMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
