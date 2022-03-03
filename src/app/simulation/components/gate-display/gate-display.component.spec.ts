import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateDisplayComponent } from './gate-display.component';

describe('GateDisplayComponent', () => {
  let component: GateDisplayComponent;
  let fixture: ComponentFixture<GateDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
