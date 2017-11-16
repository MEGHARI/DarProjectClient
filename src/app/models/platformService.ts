import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as myGlobals from "../globals"
import { User } from './user';
import {Game} from './game'
import {Observable} from 'rxjs/Rx';

@Injectable()
export class PlatformService {
    constructor(private http:Http) {}

    getPlatformsByGame(id: number) {
        return this.http.get(myGlobals.url+"/user/platformsGame?idGame="+id, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            localStorage.getItem('currentUser')
            let headers = new Headers({ 'token': currentUser.token });
            return new RequestOptions({ headers: headers });
        }
        return new RequestOptions();
    }
}

