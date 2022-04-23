import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitEntryComponent } from './circuit-entry.component';

describe('CircuitEntryComponent', () => {
  let component: CircuitEntryComponent;
  let fixture: ComponentFixture<CircuitEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircuitEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
