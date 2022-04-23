import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExistingUser } from "../../objects/ExistingUser";
import { NewUser } from '../../objects/NewUser';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  user = new NewUser()
  message = ""

  constructor(private registerService : RegisterService, private router : Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy() : void{
    this.message = ""
  }
  register()
  {
    let user = this.user;
    if(user.areAllInputsValid())
    {
      this.registerService.register(user).subscribe(
        (response) => {
          console.log(response)
          if(response.body == user.name)
            this.router.navigate(['/Login']) 
          else if(response.body == "User exists")
            this.message = "User "+user.name+" already exists"
          else
            this.message = "Unknown Error"
  
        })
    }
    else
      this.message = "One or more fields is invalid"
  }

}
