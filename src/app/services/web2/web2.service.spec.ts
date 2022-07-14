import { TestBed } from '@angular/core/testing';

import { Web2Service } from '../../web2.service';

describe('Web2Service', () => {
  let service: Web2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
