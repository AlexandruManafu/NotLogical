import { Component, OnInit } from '@angular/core';
import { NavigationButtonsService } from '../../services/navigation-buttons.service';

@Component({
  selector: 'app-navigation-toolbar',
  templateUrl: './navigation-toolbar.component.html',
  styleUrls: ['./navigation-toolbar.component.css']
})
export class NavigationToolbarComponent implements OnInit {

  constructor(private navigationButtons:NavigationButtonsService) { }

  buttons:string[] = this.navigationButtons.buttons

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.navigationButtons.tokenSub.unsubscribe()
  }

}
