import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-components-create-dropdown',
  templateUrl: './components-create-dropdown.component.html',
  styleUrls: ['./components-create-dropdown.component.css']
})
export class ComponentsCreateDropdownComponent implements OnInit {

  @Input() title : string = ""
  @Input() elements : Array<string> | null = null
  display = true
  buttonDegrees = 0
  constructor() { }

  ngOnInit(): void {
  }

  onClick()
  {
    this.display = !this.display
    if(this.display)
      this.buttonDegrees = 0
    else
      this.buttonDegrees = 180
  }

}
