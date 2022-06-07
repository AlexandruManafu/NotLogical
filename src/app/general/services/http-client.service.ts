import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';

@Injectable({
providedIn:  'root'
})

export class HttpClientService {

private serverIP:string = "http://localhost:3000";
constructor(private http: HttpClient) { }

  get(url:string, token : string) {

    let headers = new HttpHeaders();
    headers = headers.append('auth', token);
    headers = headers.append("responseType", "json")

    return this.http.get(this.serverIP+url,{headers});
  }

  getArray(url:string,token:string)
  {
    let headers = new HttpHeaders();
    headers = headers.append('auth', token);
    headers = headers.append("responseType", "json")
    
    return this.http.get<Array<Object>>(this.serverIP+url,{headers});
  }

  post(data: any, url: string) {
    return this.http.post(this.serverIP+url, data, {observe: 'response', responseType: 'text'});
  }
}