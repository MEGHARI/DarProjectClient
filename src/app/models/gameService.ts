import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as myGlobals from "../globals"
import { User } from './user';
import {Game} from './game'
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GameService {
    constructor(private http:Http) { }

    getGamesById() {
        return this.http.get(myGlobals.url+"gameUser/listGamesPocess",this.jwt()).map((response: Response) => response.json());
    }

    getAllGames() {
        return this.http.get(myGlobals.url+"admin/listGames",this.jwt()).map((response: Response) => response.json());
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

    deleteGame(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
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

