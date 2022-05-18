import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LevelShareService {

  constructor(private httpService : HttpClientService, private loginService: LoginService) { }

  uploadLevel(object : any)
  {
    let requestObject = {content:object, token : ""}
    let token = this.loginService.getField("token")
    requestObject.token = token!
    return this.httpService.post(requestObject,"/uploadLevel")
  }
}
