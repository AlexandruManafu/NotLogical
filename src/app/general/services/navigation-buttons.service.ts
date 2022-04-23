import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/user-content/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationButtonsService {

  public tokenSub : Subscription = new Subscription();
  public buttons:string[] = ["About", "Simulator", "Circuits", "Levels","Login"];

  constructor(private loginService : LoginService) {
    this.tokenSub = this.loginService.tokenMessage.subscribe(
      message => 
      {
        if(message)
        {
          this.buttons.pop();
          this.buttons.push("Logout");
        }
        else
        {
          this.buttons.pop();
          this.buttons.push("Login");
        }
          
      })
  }

}
