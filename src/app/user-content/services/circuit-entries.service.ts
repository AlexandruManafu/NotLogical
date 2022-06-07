import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClientService } from '../../general/services/http-client.service';
import { LoginService } from 'src/app/general/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CircuitEntriesService {

  private searchTerm = "any"
  private searchTermSource = new BehaviorSubject<string>(this.searchTerm)
  public searchTermMessage = this.searchTermSource.asObservable();

  changeSearchTerm(message : string)
  {
    this.searchTermSource.next(message);
  }

  constructor(private httpService : HttpClientService, private loginService : LoginService) { }

  getCircuits(searchTerm : string = "any")
  {
    let token = this.loginService.getField("token") == null ? "" :this.loginService.getField("token")!
    return this.httpService.getArray("/circuits/"+searchTerm,token)
  }
}
