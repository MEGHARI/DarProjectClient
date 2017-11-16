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
import {StaticticsComponent} from"./statistics/index"
import {TruncatePipe} from '../pipes/truncate'
import {GameUsersComponent} from "./gameUsers/gameUsers.component"
import { UserGamesComponent } from "./userGames/userGames.component";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ParameterAdminComponent } from "./parameter/parameter.component"
const appRoutes: Routes = [
    { path:"admin/:idAdmin/home",component:HomeAdminComponent },
    { path:"admin/login",component:LoginAdminComponent },
    { path:"admin/:idAdmin/games",component:GamesAdminComponent},
    { path:"admin/:idAdmin/users",component:UsersAdminComponent},
    { path:"admin/:idAdmin/users/:idUser/games",component:UserGamesComponent},
    { path:"admin/:idAdmin/games/:idGame/users",component:GameUsersComponent},
    { path:"admin/:idAdmin/users/:idUser/statistics",component:StaticticsComponent},
    { path:"admin/:idAdmin/parameters",component:ParameterAdminComponent}
]
@NgModule({
    declarations: [NavbarAdminComponent,HomeAdminComponent,LoginAdminComponent,AlertComponent,
        GamesAdminComponent,UsersAdminComponent,StaticticsComponent,TruncatePipe,
        ParameterAdminComponent,GameUsersComponent,UserGamesComponent],

    imports: [ CommonModule,RouterModule.forRoot(appRoutes),BrowserModule,HttpModule, ToastModule.forRoot(),FormsModule,ReactiveFormsModule],

    exports: [NavbarAdminComponent,HomeAdminComponent,LoginAdminComponent,AlertComponent,
        UsersAdminComponent,StaticticsComponent,TruncatePipe,ToastModule,
        ParameterAdminComponent,FormsModule,ReactiveFormsModule,GameUsersComponent,UserGamesComponent],
   providers: [HomeService,LoginAdminService ,AlertService]
})
export class AdminModule {}