import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { HomeService } from './homeService';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'home',
    providers: [HomeService],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        //this.document.body.classList.remove('back');
    }
    constructor(private homeService: HomeService, @Inject(DOCUMENT) private document: Document ) {}

    ngOnInit() {
        //this.document.body.classList.add('back');
    }

}