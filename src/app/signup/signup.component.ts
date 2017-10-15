import { Component } from "@angular/core";
import {signupService} from "./signup.service";
import {NgForm,NgControl,NgModel} from "@angular/forms";
import{Router} from "@angular/router";
import * as myGlobals from "../globals";
@Component({

    templateUrl:"signup.component.html",
    styleUrls:["signup.component.css"],
    selector :"app-root",
    providers :[signupService]
})
export class SignupComponent {
   public inf :string; 
   public name :string;
    
constructor(public service :signupService,private route : Router){}
public onInfo(n : NgForm){
    this.service.getInfo().subscribe((data) => this.inf = data);
    //this.inf = n.name;
    //this.route.navigate(["/about"]);
    alert(myGlobals.url);
}
}
