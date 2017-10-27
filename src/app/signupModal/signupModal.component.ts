import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
@Component({
    selector: 'signupModal',
    templateUrl: './signupModal.component.html',
    styleUrls: ['./signupModal.component.css'],
    
})

export class SignupModalComponent implements OnInit {
    
    public visible = false;
    public visibleAnimate = false;
    constructor() { }
    public onHide(): void {
        jQuery("#signupModal").modal("hide");
      }
    ngOnInit() { }
    
}