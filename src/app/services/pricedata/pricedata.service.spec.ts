import { TestBed } from '@angular/core/testing';

import { PricedataService } from './pricedata.service';

describe('PricedataService', () => {
  let service: PricedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
