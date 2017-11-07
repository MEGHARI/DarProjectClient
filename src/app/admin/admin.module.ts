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
import {GamesAdminComponent} from "./games/index"
import {UsersAdminComponent} from "./users/index"

const appRoutes: Routes = [
    { path:"admin/home",component:HomeAdminComponent },
    { path:"admin/login",component:LoginAdminComponent },
    { path:"admin/games",component:GamesAdminComponent},
    { path:"admin/users",component:UsersAdminComponent}
]
@NgModule({
    declarations: [NavbarAdminComponent,HomeAdminComponent,LoginAdminComponent,AlertComponent,
        GamesAdminComponent,UsersAdminComponent],

    imports: [ CommonModule,RouterModule.forRoot(appRoutes),BrowserModule,HttpModule,FormsModule
        ,ReactiveFormsModule ],

    exports: [NavbarAdminComponent,HomeAdminComponent,LoginAdminComponent,AlertComponent,
        UsersAdminComponent],
    providers: [HomeService,LoginAdminService ,AlertService]
})
export class AdminModule {}