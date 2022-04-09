import { TestBed } from '@angular/core/testing';

import { CircuitManipulationService } from './circuit-manipulation.service';

describe('CircuitManipulationService', () => {
  let service: CircuitManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CircuitManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
