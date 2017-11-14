'use strict';
import { Observable } from 'rxjs';
import {AlertService} from "./alert/alert.component.service"
import {User} from "./models/user"

// vars and consts
export var signupSuccess : boolean ;
export var  islogged : boolean = false;
export const url : string = 'http://localhost:8080/DarProject/'

// functions
export function setSignupSuccess(val:boolean){
   signupSuccess=val;
}
export function setLogged(log : boolean){
    islogged = log; 
}

