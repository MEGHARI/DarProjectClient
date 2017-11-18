import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as myGlobals from "../globals"
import { User } from './user';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UserService {
constructor(private http:Http) { }
    getAll() {
        return this.http.get(myGlobals.url+"admin/listUsers", this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user:Object) {
        return this.http.post(myGlobals.url+'user/register',JSON.stringify(user),this.jwt()).map((response: Response) => response.json());
    }
    createAdmin(user:Object) {
        return this.http.post(myGlobals.url+'admin/create',JSON.stringify(user),this.jwt()).map((response: Response) => response.json());
    }
    update(user: any) {
        return this.http.put(myGlobals.url+'user/update', user,
        this.jwt()).map((response: Response) => response.json());
    }

    bannUser(ident: number) {
        return this.http.put(myGlobals.url+'admin/banned' ,JSON.stringify({id:ident}), this.jwt()).map((response: Response) => response.json());
    }
    unbannUser(ident: number){
        return this.http.put(myGlobals.url+'admin/unbanned' ,JSON.stringify({id:ident}), this.jwt()).map((response: Response) => response.json());
        
    }
    sendMessageToUser(idReceiver : number,messageText:string){
        return this.http.post(myGlobals.url+'message/send',JSON.stringify({id:idReceiver,message:messageText}),this.jwt()).map((response: Response) => response.json());
        
    }
    getMessagesByUser(id : number){
        return this.http.get(myGlobals.url+"message/list", this.jwt()).map((response: Response) => response.json());
         
    }

    searchAddress(address:string){
        return this.http.get(myGlobals.url+"service/googlemapAutocomplete?prefixe="+address).map((response: Response) => response.json());      
        
    }
    logout(){
        return this.http.get(myGlobals.url+"user/logout", this.jwt()).map((response: Response) => response.json());
        
    }

    getUsersByGame(id: number) {
        return this.http.get(myGlobals.url+'user/listUsersGame?idApiGame='+id,this.jwt()).map((response: Response) => response.json());
    }
    getStatisticsByUser(id:number){
        return this.http.get(myGlobals.url+'admin/statsExchanges?idUser='+id,this.jwt()).map((response: Response) => response.json());
        
    }
    getAllAdmins(){
        return this.http.get(myGlobals.url+'admin/listAmins',this.jwt()).map((response: Response) => response.json());
        
    }

    addGameUser(idPlatform:number, relation:number) {
        return this.http.post(myGlobals.url+'gameUser/add',
        '{"idGamePlatform":"'+idPlatform+'","relation":"'+relation+'"}',
        this.jwt()).map((response: Response) => response.json());
    }

    deleteGameUser(idGame:string) {
        return this.http.delete(myGlobals.url+'gameUser/remove?id='+idGame,
        this.jwt()).map((response: Response) => response.json());
    }

    getGames(){

        return this.http.get(myGlobals.url+"gameUser/listGamesPocess",this.jwt()).map((response: Response) => response.json());
    }
    searchGamesForExchanging(title : string){
        return this.http.get(myGlobals.url+'exchange/autoCompleteSearch?title='+title,this.jwt()).map((response: Response) => response.json());
        
    }
    createGameExchanges(object : Object){
            return this.http.post(myGlobals.url+'exchange/create',object,this.jwt()).map((response: Response) => response.json());
    }
    
    getDistance(address1:String,address2 :string){
        return this.http.get(myGlobals.url+'service/googlemapDistanceDuration?addr1='+address1+"&addr2="+address2,this.jwt()).map((response: Response) => response.json());
        
    }

    // private helper methods

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