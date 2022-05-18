import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationButtonsService } from '../../services/navigation-buttons.service';

@Component({
  selector: 'app-navigation-toolbar',
  templateUrl: './navigation-toolbar.component.html',
  styleUrls: ['./navigation-toolbar.component.css']
})
export class NavigationToolbarComponent implements OnInit {

  displayNavigation = true
  displayNavigationSub = new Subscription()

  constructor(private navigationButtons:NavigationButtonsService) { }

  buttons:string[] = this.navigationButtons.buttons

  ngOnInit(): void {
    this.displayNavigationSub = this.navigationButtons.displayNavigationMessage.subscribe(
      (message)=>{
        this.displayNavigation = message
      })
  }

  ngOnDestroy(): void {
    this.navigationButtons.tokenSub.unsubscribe()
  }

}
