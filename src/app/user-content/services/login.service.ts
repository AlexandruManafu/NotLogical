import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExistingUser } from '../objects/ExistingUser';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private token : string | null= ""
  private tokenSource = new BehaviorSubject<string|null>(this.token)
  public tokenMessage = this.tokenSource.asObservable();

  changeToken(message : string|null)
  {
    this.tokenSource.next(message);
  }

  constructor(private httpClient : HttpClientService) { 
    this.changeToken(this.getField("token"));
  }

  login(user : ExistingUser)
  {
    let object = {name : user.name, password: user.password}
    return this.httpClient.post(object,"/login")
  }

  logout()
  {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.changeToken("");
  }

  setUser(username:string, token:string){
    localStorage.setItem("user", username);
    localStorage.setItem("token",token);
    this.changeToken(token);
  }

  getField(field : string)
  {
    return localStorage.getItem(field);
  }

  isUserLoggedIn() : boolean
  {
    let user = localStorage.getItem("user")
    let token = localStorage.getItem("token")

    return (user != undefined) && (token != undefined)
  }
}
