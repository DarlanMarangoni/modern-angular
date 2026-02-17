import { TestBed } from '@angular/core/testing';

import { ProventosService } from './proventos.service';

describe('ProventosService', () => {
  let service: ProventosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProventosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
