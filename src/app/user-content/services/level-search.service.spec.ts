import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LevelSearchService } from './level-search.service';


describe('LevelSearchService', () => {
  let service: LevelSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(LevelSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
