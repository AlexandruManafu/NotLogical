import { TestBed } from '@angular/core/testing';

import { OverlayToggleService } from './overlay-toggle.service';

describe('OverlayToggleService', () => {
  let service: OverlayToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
