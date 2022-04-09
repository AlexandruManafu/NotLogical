import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WireDisplayComponent } from './wire-display.component';

describe('WireDisplayComponent', () => {
  let component: WireDisplayComponent;
  let fixture: ComponentFixture<WireDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WireDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WireDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
