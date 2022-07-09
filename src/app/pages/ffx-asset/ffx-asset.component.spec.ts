import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfxAssetComponent } from './ffx-asset.component';

describe('FfxAssetComponent', () => {
  let component: FfxAssetComponent;
  let fixture: ComponentFixture<FfxAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FfxAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FfxAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
