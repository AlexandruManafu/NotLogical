import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelBuilderPreviewComponent } from './level-builder-preview.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('LevelBuilderPreviewComponent', () => {
  let component: LevelBuilderPreviewComponent;
  let fixture: ComponentFixture<LevelBuilderPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelBuilderPreviewComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelBuilderPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
