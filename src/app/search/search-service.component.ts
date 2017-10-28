import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, HttpModule, Request, Response, RequestOptionsArgs } from '@angular/http'

@Injectable()
export class SearchService {

  constructor(private http: Http) {}

  createAuthorizationHeader(headers:Headers) {
    headers.append('user-key', 'dc7f9da90462dd90d9594bf3e2664d51');
  }

  doSomething(search,offset) {
    //let headers = new Headers({'Content-Type': 'application/json'});  
    //headers.append('user-key', 'dc7f9da90462dd90d9594bf3e2664d51');
    //let options = new RequestOptions({headers: headers});
    //this.createAuthorizationHeader(myHeaders);
    return this.http.get('http://localhost:8080/DarProject/testsearch?title=fifa17&offset='+offset);
  }
}