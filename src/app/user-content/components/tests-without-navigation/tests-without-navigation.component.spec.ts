import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsWithoutNavigationComponent } from './tests-without-navigation.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('TestsWithoutNavigationComponent', () => {
  let component: TestsWithoutNavigationComponent;
  let fixture: ComponentFixture<TestsWithoutNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestsWithoutNavigationComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsWithoutNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
