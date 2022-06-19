import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalCircuitComponent } from './local-circuit.component';

describe('LocalCircuitComponent', () => {
  let component: LocalCircuitComponent;
  let fixture: ComponentFixture<LocalCircuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalCircuitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
