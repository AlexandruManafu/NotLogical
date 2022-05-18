import { TestBed } from '@angular/core/testing';

import { LevelShareService } from './level-share.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('LevelShareService', () => {
  let service: LevelShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],

    });
    
    service = TestBed.inject(LevelShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
