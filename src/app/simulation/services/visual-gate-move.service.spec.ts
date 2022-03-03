import { TestBed } from '@angular/core/testing';

import { VisualGateMoveService } from './visual-gate-move.service';

describe('VisualGateMoveService', () => {
  let service: VisualGateMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualGateMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
