import { TestBed } from '@angular/core/testing';

import { LevelSearchService } from './level-search.service';

describe('LevelSearchService', () => {
  let service: LevelSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
