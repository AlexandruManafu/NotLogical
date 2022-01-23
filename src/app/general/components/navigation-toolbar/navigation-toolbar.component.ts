import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-toolbar',
  templateUrl: './navigation-toolbar.component.html',
  styleUrls: ['./navigation-toolbar.component.css']
})
export class NavigationToolbarComponent implements OnInit {

  constructor() { }

  buttons:string[] = ["About", "Test", "Levels", "Sign-up","Login"];

  ngOnInit(): void {
  }

  display(windowName: string): void
  {
    console.log("Clicked on button: "+windowName);
  }

}
