import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelBuilderConditionComponent } from './level-builder-condition.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('LevelBuilderConditionComponent', () => {
  let component: LevelBuilderConditionComponent;
  let fixture: ComponentFixture<LevelBuilderConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ LevelBuilderConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelBuilderConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
