import { Component, OnInit } from '@angular/core';
import {MessagesService} from "./messagesService"
@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css','../../assets/css2/profile.component.css', '../../assets/css2/style.css',
    '../../assets/css2/spinners.css', '../../assets/css2/animate.css']
})
export class MessagesComponent implements OnInit {
    constructor(public messageservice : MessagesService) { }

    ngOnInit() { }
}