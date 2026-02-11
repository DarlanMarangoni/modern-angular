import { TestBed } from '@angular/core/testing';

import { InvestimentosServices } from './investimentos.services';

describe('InvestimentosServices', () => {
  let service: InvestimentosServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestimentosServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
