import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTableRowComponent } from './price-table-row.component';

describe('PriceTableRowComponent', () => {
  let component: PriceTableRowComponent;
  let fixture: ComponentFixture<PriceTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceTableRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
