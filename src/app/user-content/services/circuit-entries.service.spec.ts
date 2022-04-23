import { TestBed } from '@angular/core/testing';

import { CircuitEntriesService } from './circuit-entries.service';

describe('CircuitEntriesService', () => {
  let service: CircuitEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CircuitEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
