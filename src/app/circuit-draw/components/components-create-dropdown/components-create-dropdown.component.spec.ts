import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsCreateDropdownComponent } from './components-create-dropdown.component';

describe('ComponentsCreateDropdownComponent', () => {
  let component: ComponentsCreateDropdownComponent;
  let fixture: ComponentFixture<ComponentsCreateDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsCreateDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsCreateDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
