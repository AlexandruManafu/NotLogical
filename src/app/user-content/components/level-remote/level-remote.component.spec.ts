import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelRemoteComponent } from './level-remote.component';

describe('LevelRemoteComponent', () => {
  let component: LevelRemoteComponent;
  let fixture: ComponentFixture<LevelRemoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelRemoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
