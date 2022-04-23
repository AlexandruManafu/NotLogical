import { Injectable } from '@angular/core';
import { NewUser } from '../objects/NewUser';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient : HttpClientService) {
  }

  public register(user : NewUser)
  {
    let object = {name : user.name, password: user.password, email : user.email}
    //console.log(object)
    return this.httpClient.post(object,"/register")
  }
}
