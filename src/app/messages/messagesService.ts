import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import {Message} from '../models/message'
import {User} from '../models/user'
@Injectable()
export class MessagesService {
    constructor(public http :Http){

    }
    public getMessagesByUser(id : number):Message[]{
        return null;
    }
    public getUsersWidthSpeacked():User[]{
        return null;
    }
    public answer(message : Message){

    }
}