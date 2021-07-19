import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuFaultMasterComponent } from './sku-fault-master.component';

describe('SkuFaultMasterComponent', () => {
  let component: SkuFaultMasterComponent;
  let fixture: ComponentFixture<SkuFaultMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkuFaultMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuFaultMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
