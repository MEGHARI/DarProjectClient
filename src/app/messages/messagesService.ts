import { Injectable } from '@angular/core';
import {Message} from '../models/message'
import {User} from '../models/user'
import * as myGlobals from "../globals"
import { Http, Headers, RequestOptions, Response } from '@angular/http';
@Injectable()
export class MessagesService {
    constructor(public http :Http){

    }
    public getMessagesByUser(id : number){
       return this.http.get(myGlobals.url+"message/list", this.jwt()).map((response: Response) => response.json());
        
    }
    public sendMessageToUser(message : Message){

    }
    public getLatestUsers(){

    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'token': currentUser.token });
            return new RequestOptions({ headers: headers });
        }
        return new RequestOptions();
    }
}