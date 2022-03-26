import { TestBed } from '@angular/core/testing';

import { SimulationRunnerService } from './simulation-runner.service';

describe('SimulationRunnerService', () => {
  let service: SimulationRunnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulationRunnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
