import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuDailogComponent } from './sku-dailog.component';

describe('SkuDailogComponent', () => {
  let component: SkuDailogComponent;
  let fixture: ComponentFixture<SkuDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkuDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
