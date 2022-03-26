import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsToolbarComponent } from './components-toolbar.component';

describe('ComponentsToolbarComponent', () => {
  let component: ComponentsToolbarComponent;
  let fixture: ComponentFixture<ComponentsToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
