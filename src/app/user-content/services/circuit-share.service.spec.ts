import { TestBed } from '@angular/core/testing';

import { CircuitShareService } from './circuit-share.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";


describe('CircuitShareService', () => {
  let service: CircuitShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [RouterTestingModule, HttpClientTestingModule]});
    service = TestBed.inject(CircuitShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
