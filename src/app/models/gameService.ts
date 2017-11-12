import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as myGlobals from "../globals"
import { User } from './user';
import {Game} from './game'
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GameService {
    constructor(private http:Http) { }

    getGamesById(user : User) {
        return this.http.get(myGlobals.url+"users/"+user.id+"/games", this.jwt()).map((response: Response) => response.json());
    }

    searchGame(name: String, offset:number){
        if(localStorage.getItem("currentUser"))
            return this.http.get(myGlobals.url+"game/search?title="+name+"&offset="+offset, this.jwt()).map((response: Response) => response.json());
        return this.http.get(myGlobals.url+"game/search?title="+name+"&offset="+offset).map((response: Response) => response.json());
        
        
    }
    autoSearchGames(name: String,){
        return this.http.get(myGlobals.url+"game/autoCompleteSearch?title="+name).map((response: Response) => response.json());      
    }

    getGamesByUser(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    addGame(user:Object) {
        return this.http.post(myGlobals.url+'user/register',JSON.stringify(user),this.jwt()).map((response: Response) => response.json());
    }
    updategame(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    deleteGame(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
        return new RequestOptions();
    }
}

