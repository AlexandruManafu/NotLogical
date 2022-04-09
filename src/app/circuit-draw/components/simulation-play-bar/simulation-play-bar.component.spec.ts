import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationPlayBarComponent } from './simulation-play-bar.component';

describe('SimulationPlayBarComponent', () => {
  let component: SimulationPlayBarComponent;
  let fixture: ComponentFixture<SimulationPlayBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
