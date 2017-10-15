import { Component } from "@angular/core";
import {service} from "./inscriptions.service";
import {NgForm,NgControl,NgModel} from "@angular/forms";
import{Router} from "@angular/router";
import * as myGlobals from "../globals";
@Component({

    templateUrl:"inscriptions.component.html",
    styleUrls:["inscriptions.component.css"],
    selector :"app-root",
    providers :[service]
})
export class InscriptionsComponent {
   public inf :string; 
   public name :string;
    
constructor(public service :service,private route : Router){}
public onInfo(n : NgForm){
    this.service.getInfo().subscribe((data) => this.inf = data);
    //this.inf = n.name;
    //this.route.navigate(["/about"]);
    alert(myGlobals.url);
}
}
