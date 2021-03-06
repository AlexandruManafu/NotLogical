import { TestBed } from '@angular/core/testing';

import { CircuitEntriesService } from './circuit-entries.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";


describe('CircuitEntriesService', () => {
  let service: CircuitEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [RouterTestingModule, HttpClientTestingModule]});
    service = TestBed.inject(CircuitEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
