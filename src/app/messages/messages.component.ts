import { Component, OnInit } from '@angular/core';
import {MessagesService} from "./messagesService"
@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    constructor(public messageservice : MessagesService) { }

    ngOnInit() { }
}