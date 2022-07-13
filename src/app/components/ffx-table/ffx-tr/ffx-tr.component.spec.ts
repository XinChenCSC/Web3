import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfxTrComponent } from './ffx-tr.component';

describe('FfxTrComponent', () => {
  let component: FfxTrComponent;
  let fixture: ComponentFixture<FfxTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FfxTrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FfxTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
