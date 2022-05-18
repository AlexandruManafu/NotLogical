import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelBuilderSaveComponent } from './level-builder-save.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('LevelBuilderSaveComponent', () => {
  let component: LevelBuilderSaveComponent;
  let fixture: ComponentFixture<LevelBuilderSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelBuilderSaveComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelBuilderSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
