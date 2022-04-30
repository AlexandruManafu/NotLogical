import { TestBed } from '@angular/core/testing';

import { NavigationButtonsService } from './navigation-buttons.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('NavigationButtonsService', () => {
  let service: NavigationButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [RouterTestingModule, HttpClientTestingModule]});
    service = TestBed.inject(NavigationButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
