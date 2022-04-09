import { TestBed } from '@angular/core/testing';

import { WiringDrawService } from './wiring-draw.service';

describe('WiringService', () => {
  let service: WiringDrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WiringDrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
