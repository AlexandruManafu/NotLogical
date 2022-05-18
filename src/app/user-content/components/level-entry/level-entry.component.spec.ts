import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { LevelEntryComponent } from './level-entry.component';

describe('LevelEntryComponent', () => {
  let component: LevelEntryComponent;
  let fixture: ComponentFixture<LevelEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterModule], 
      declarations: [ LevelEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
