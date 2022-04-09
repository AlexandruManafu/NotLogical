import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateCreateComponent } from './gate-create.component';

describe('GateCreateComponent', () => {
  let component: GateCreateComponent;
  let fixture: ComponentFixture<GateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
