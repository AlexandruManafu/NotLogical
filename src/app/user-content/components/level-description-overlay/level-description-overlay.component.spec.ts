import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelDescriptionOverlayComponent } from './level-description-overlay.component';

describe('LevelDescriptionOverlayComponent', () => {
  let component: LevelDescriptionOverlayComponent;
  let fixture: ComponentFixture<LevelDescriptionOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelDescriptionOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelDescriptionOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
