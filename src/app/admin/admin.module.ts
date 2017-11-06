import {NgForm} from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {NavbarAdminComponent} from "./navbar/navbar.component" 
import {HomeAdminComponent,HomeService} from "./home/index"
import {LoginAdminComponent,LoginAdminService} from "./login/index"
import{AlertComponent,AlertService} from '../alert/index'
const appRoutes: Routes = [
    { path:"admin/home",component:HomeAdminComponent },
    { path:"admin/login",component:LoginAdminComponent }
]
@NgModule({
    declarations: [NavbarAdminComponent,HomeAdminComponent,LoginAdminComponent,AlertComponent],
    imports: [ CommonModule,RouterModule.forRoot(appRoutes),BrowserModule,HttpModule,FormsModule
        ,ReactiveFormsModule ],
    exports: [NavbarAdminComponent,HomeAdminComponent,LoginAdminComponent,AlertComponent],
    providers: [HomeService,LoginAdminService ,AlertService],
})
export class AdminModule {}