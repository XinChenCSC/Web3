import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfxMaterialTableComponent } from './ffx-material-table.component';

describe('FfxMaterialTableComponent', () => {
  let component: FfxMaterialTableComponent;
  let fixture: ComponentFixture<FfxMaterialTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FfxMaterialTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FfxMaterialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
