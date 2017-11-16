
/**
 * Modules
 */
import { NgModule } from '@angular/core';
import {NgForm} from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import {AdminModule} from "./admin/admin.module"
//import { AuthModule } from 'angular2-auth';
//import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { Ng2CompleterModule } from "ng2-completer";

/**
 * Providers
 */
// navbar
import {NavbarComponent} from "./navbar/navbar.component"


// route
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from "./test/test.component";
// providers

import { AuthGuard } from './guards/index';
import { SearchComponent} from "./search/search.component"

// home
import { HomeComponent } from './home/home.component';

// app
import { AppComponent } from './app.component';
//about
import  {AboutComponent} from "./about/about.component";

// signup
import { SignupComponent} from "./signup/index";

//profile
import { ProfileService, ProfileComponent } from "./profile/index";

// login

import { LoginComponent,LoginService } from "./login/index";
import { LoginModalComponent } from './login/loginModal/loginModal.component';

// search
import { SearchGamesComponent } from "./searchGame/index";

// alert
import{AlertComponent,AlertService} from './alert/index'

// model
import {UserService,GameService, PlatformService} from './models/index'

// images
import { ImageUploadModule } from "angular2-image-upload";

//messages
import {MessagesComponent} from "./messages/index"

// myGames
import {MyGamesComponent,MyGameService} from "./myGames/index"

// history
import {HistoryComponent,HistoryService} from "./history/index"
//Pipe
//import {TruncatePipe} from './pipes/truncate'

const appRoutes: Routes = [
   { path: 'about', component: AboutComponent },
   { path: 'login', component: LoginComponent },
   { path: 'search/:name', component: SearchComponent },
   { path: 'test', component: TestComponent },
   //{ path: '', redirectTo: '/home', pathMatch: 'full' },
   //{ path: '', component: HomeComponent },
   { path: 'home', component: HomeComponent },
   {path :'about',component:AboutComponent},
   { path: 'signup', component: SignupComponent  },
   { path: 'users/:id/profile', component: ProfileComponent  },
   {path: 'users/:id/messages', component: MessagesComponent },
   {path: 'users/:id/games', component: MyGamesComponent },
   {path: 'users/:id/history', component: HistoryComponent},

];

@NgModule({

  imports: [BrowserModule,Ng2CompleterModule ,HttpModule,
    RouterModule.forRoot(appRoutes)
    ,InfiniteScrollModule,ImageUploadModule.forRoot(),AdminModule],
  
  declarations: [AppComponent,AboutComponent,
     HomeComponent,LoginComponent, LoginModalComponent,
   SignupComponent,ProfileComponent,NavbarComponent,
   SearchGamesComponent,SearchComponent, TestComponent,
   MessagesComponent,MyGamesComponent,HistoryComponent,
    ],

  providers :[
    LoginService,
    AuthGuard,
    UserService,
    GameService,
    ProfileService,
    MyGameService,
    HistoryService,
    PlatformService
  ],
  exports:[],
  bootstrap: [AppComponent]
  
})

export class AppModule {}