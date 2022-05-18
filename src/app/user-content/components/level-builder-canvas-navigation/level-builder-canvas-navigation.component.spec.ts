import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelBuilderCanvasNavigationComponent } from './level-builder-canvas-navigation.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('LevelBuilderCanvasNavigationComponent', () => {
  let component: LevelBuilderCanvasNavigationComponent;
  let fixture: ComponentFixture<LevelBuilderCanvasNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelBuilderCanvasNavigationComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelBuilderCanvasNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
