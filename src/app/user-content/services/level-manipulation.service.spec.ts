import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LevelManipulationService } from './level-manipulation.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";


describe('LevelManipulationService', () => {
  let service: LevelManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(LevelManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
