import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/general/services/login.service';
import { HttpClientService } from 'src/app/general/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CircuitShareService {

  private targetEntry : any = null
  private targetEntrySource = new BehaviorSubject<any>(this.targetEntry)
  public targetEntryMessage = this.targetEntrySource.asObservable();

  changeTargetEntry(message : any)
  {
    this.targetEntrySource.next(message);
  }

  constructor(private httpService : HttpClientService, private loginService: LoginService) { }

  private getRequestObject(circuitId : number | string) : any
  {
    let requestObject = {circuitId : circuitId, token:""}
    let token = this.loginService.getField("token")
    requestObject.token = token!

    return requestObject
  }

  uploadCircuit(circuitName : string, normalizedCircuit : any)
  {
    let requestObject = {name : circuitName, normalizedCircuit : normalizedCircuit, token : ""}
    let token = this.loginService.getField("token")
    requestObject.token = token!
    return this.httpService.post(requestObject,"/uploadCircuit")
  }

  shareCircuit(circuitId : string)
  {
    let requestObject = this.getRequestObject(circuitId)
    return this.httpService.post(requestObject,"/shareCircuit")
  }

  unshareCircuit(circuitId : string)
  {
    let requestObject = this.getRequestObject(circuitId)
    return this.httpService.post(requestObject,"/unshareCircuit")
  }

  deleteCircuit(circuitId : string)
  {
    let requestObject = this.getRequestObject(circuitId)
    return this.httpService.post(requestObject,"/deleteCircuit")
  }

  getCircuit(circuitId : string)
  {
    let token = this.loginService.getField("token")
    token = token! ? token : ""
    return this.httpService.get("/circuit/"+circuitId,token)
  }

}
