import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfxTableComponent } from './ffx-table.component';

describe('FfxTableComponent', () => {
  let component: FfxTableComponent;
  let fixture: ComponentFixture<FfxTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FfxTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FfxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
