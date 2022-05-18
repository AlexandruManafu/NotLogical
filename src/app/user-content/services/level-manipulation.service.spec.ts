import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { LevelManipulationService } from './level-manipulation.service';

describe('LevelManipulationService', () => {
  let service: LevelManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(LevelManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
