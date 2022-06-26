import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/general/services/login.service';
import { HttpClientService } from '../../general/services/http-client.service';
import { Level } from '../objects/Level';

@Injectable({
  providedIn: 'root'
})
export class LevelShareService {

  constructor(private httpService : HttpClientService, private loginService: LoginService) { }

  private getRequestObject(circuitId : number | string) : any
  {
    let requestObject = {circuitId : circuitId, token:""}
    let token = this.loginService.getField("token")
    requestObject.token = token!

    return requestObject
  }

  uploadLevel(object : any)
  {
    let requestObject = {content:object, token : ""}
    let token = this.loginService.getField("token")
    requestObject.token = token!
    return this.httpService.post(requestObject,"/uploadLevel")
  }

  getLevel(levelId : string)
  {
    let token = this.loginService.getField("token")
    token = token! ? token : ""
    return this.httpService.get("/level/"+levelId,token)
  }

  incrementNumberCorrect(levelId : number)
  {
    return this.httpService.get("/levelCompleted/"+levelId,"")
  }

  deleteLevel(levelId : string)
  {
    let requestObject = this.getRequestObject(levelId)
    return this.httpService.post(requestObject,"/deleteLevel")
  }
}
