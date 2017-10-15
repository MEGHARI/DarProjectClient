import { Component } from "@angular/core";
import {service} from "./form.service";
import {NgForm,NgControl,NgModel} from "@angular/forms";
import{Router} from "@angular/router";
@Component({

    templateUrl:"form.component.html",
    styleUrls:["form.component.css"],
    selector :"app-root",
    providers :[service]
})
export class FormComponent {
   public inf :string; 
   public name :string;

constructor(public service :service,private route : Router){}
public onInfo(n : NgForm){
    //this.service.getInfo().subscribe((data) => this.inf = data);
    this.inf = n.name;
    this.route.navigate(["/about"]);
}
}