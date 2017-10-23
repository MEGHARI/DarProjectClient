import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, HttpModule, Request,
    Response, RequestOptionsArgs } from '@angular/http'

@Injectable()
export class HomeService {


  constructor(private http: Http) {}

  createAuthorizationHeader(headers:Headers) {
    headers.append('dc7f9da90462dd90d9594bf3e2664d51', 'dc7f9da90462dd90d9594bf3e2664d51');
    headers.append('Accept', 'application/json');
  }

  doSomething() {
    var headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get('https://api-2445582011268.apicast.io/games/?search=halo', {headers: headers} );
  }
}