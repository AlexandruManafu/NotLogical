import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExistingUser } from '../../objects/ExistingUser';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user = new ExistingUser();
  message = "";
  
  constructor(private loginService : LoginService, private router : Router) { }
  
  ngOnInit(): void { 
     
  }
  
  ngOnDestroy() : void{
    this.message = ""
  }
  login()
  {
    let user = this.user;
    if(user.areAllInputsValid())
    {
      this.loginService.login(user).subscribe(
        (response : any) => {
          console.log(response)
          if(response.body!.length > 20)
          {
            this.router.navigate(['/About'])
            this.loginService.setUser(user.name,response.body!)
          } 
          else if(response.body == "Wrong password" || response.body == "No such user")
            this.message = "Wrong credentials";
          else
            this.message = "Unknown Error"
  
        })
    }
    else
      this.message = "One or more fields is invalid"
  }

  register()
  {
    this.router.navigate(["/Sign-up"])
  }

}