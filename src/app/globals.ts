'use strict';
import { Observable } from 'rxjs';
import {AlertService} from "./alert/alert.component.service"
export const url ='/jjhjh';
export var signupSuccess : boolean ;

export function setSignupSuccess(){
signupSuccess = true;
}
export function setSignupNeutral(){
    signupSuccess = false;
    }
