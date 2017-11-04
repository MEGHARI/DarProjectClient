'use strict';
import { Observable } from 'rxjs';
import {AlertService} from "./alert/alert.component.service"


// vars and consts
export var signupSuccess : boolean ;
export var  islogged : boolean = false;


// functions
export function setSignupSuccess(){
    signupSuccess = true;
}
export function setLogged(log : boolean){
    islogged = log; 
}

