import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/general/services/login.service';
import { HttpClientService } from '../../general/services/http-client.service';


@Injectable({
  providedIn: 'root'
})
export class LevelSearchService {
  constructor(private httpService : HttpClientService, private loginService : LoginService) { }

  getLevels(searchTerm : string = "any")
  {
    let token = this.loginService.getField("token") == null ? "" :this.loginService.getField("token")!
    return this.httpService.getArray("/levels/"+searchTerm,token)
  }
}
