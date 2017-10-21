import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from "@angular/forms";
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public loading: boolean = true;
    public formGroupLogin: FormGroup;
    constructor(public formBuilder : FormBuilder) { }
       ngOnInit() { 
        this.formGroupLogin = this.formBuilder.group({
            mail :['',Validators.required],
            password :['',Validators.required]
        })
    }
}