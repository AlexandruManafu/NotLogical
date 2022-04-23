import { HttpClient } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
providedIn:  'root'
})

export class HttpClientService {

private serverIP:string = "http://localhost:3000";

constructor(private http: HttpClient) { }

  get(url:string, textResponse : boolean) {
    if(textResponse)
      return this.http.get(this.serverIP+url,{responseType: 'text'});
    else
      return this.http.get(this.serverIP+url,{responseType: 'json'});
  }

  getArray(url:string)
  {
      return this.http.get<Array<Object>>(this.serverIP+url,{responseType: 'json'});
  }

  post(data: any, url: string) {
    return this.http.post(this.serverIP+url, data, {observe: 'response', responseType: 'text'});
  }
}