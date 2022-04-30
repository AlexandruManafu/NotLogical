import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationToolbarComponent } from './navigation-toolbar.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";


describe('NavigationToolbarComponent', () => {
  let component: NavigationToolbarComponent;
  let fixture: ComponentFixture<NavigationToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ NavigationToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
