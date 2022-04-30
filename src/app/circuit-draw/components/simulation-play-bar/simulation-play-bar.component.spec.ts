import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationPlayBarComponent } from './simulation-play-bar.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('SimulationPlayBarComponent', () => {
  let component: SimulationPlayBarComponent;
  let fixture: ComponentFixture<SimulationPlayBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ SimulationPlayBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationPlayBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
