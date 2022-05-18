import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelBuilderComponent } from './level-builder.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('LevelBuilderComponent', () => {
  let component: LevelBuilderComponent;
  let fixture: ComponentFixture<LevelBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ LevelBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
