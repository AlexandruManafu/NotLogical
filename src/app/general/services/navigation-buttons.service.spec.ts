import { TestBed } from '@angular/core/testing';

import { NavigationButtonsService } from './navigation-buttons.service';

describe('NavigationButtonsService', () => {
  let service: NavigationButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
