import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppHttpheadersService {

  constructor(private httpClient: HttpClient) {}

  createAuthorizationHeader(headers: HttpHeaders,h1,h2,h3,v1,v2,v3) {
    headers=headers.append(h1,v1),
    headers=headers.append(h2,v2),
    headers=headers.append(h3,v3)
    console.log(headers) 
    //       'Auth-token': 'sfw0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ8'
  }
 
  get(url,h1,h2,h3,v1,v2,v3) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers,h1,h2,h3,v1,v2,v3);
    return this.httpClient.get(url, {
      headers: headers
    });
  }

  post(url,data,h1,h2,h3,v1,v2,v3) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers,h1,h2,h3,v1,v2,v3);
    return this.httpClient.post(url, data, {
      headers: headers
    });
  }
}