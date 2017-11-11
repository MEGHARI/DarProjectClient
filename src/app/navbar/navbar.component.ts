import { Component, OnInit,Input } from '@angular/core';
import {User} from "../models/user"
@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @Input() public  isLogged : boolean;
    @Input() public user : User;
    constructor() { }

    ngOnInit() {
        
     }
}