import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseLogInComponent } from './please-log-in.component';

describe('PleaseLogInComponent', () => {
  let component: PleaseLogInComponent;
  let fixture: ComponentFixture<PleaseLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PleaseLogInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PleaseLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
