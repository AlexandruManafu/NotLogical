import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateDeleteDropComponent } from './gate-delete-drop.component';

describe('GateDeleteDropComponent', () => {
  let component: GateDeleteDropComponent;
  let fixture: ComponentFixture<GateDeleteDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateDeleteDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateDeleteDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
