import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelBuilderStartComponent } from './level-builder-start.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";


describe('LevelBuilderStartComponent', () => {
  let component: LevelBuilderStartComponent;
  let fixture: ComponentFixture<LevelBuilderStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelBuilderStartComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelBuilderStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
