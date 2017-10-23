
/**
 * Modules
 */
import { NgModule } from '@angular/core';
import {NgForm} from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
//import { AuthModule } from 'angular2-auth';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { Ng2CompleterModule } from "ng2-completer";
/**
 * Providers
 */

// used to create fake backend
import { fakeBackendProvider } from './helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';


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
import {SignupModalComponent} from "./signupModal/signupModal.component";
import {SignupPageComponent} from './signupPage/signupPage.component'


// login

import { LoginComponent,LoginService } from "./login/index";
import {LoginPageComponent} from './loginPage/loginPage.component'
import { LoginModalComponent } from './loginModal/loginModal.component';

// search
import { SearchGamesComponent,SearchGamesService } from "./searchGame/index";

// alert
import{AlertComponent,AlertService} from './alert/index'

// model
import {UserService,GameService} from './models/index'
const appRoutes: Routes = [
   { path: 'about', component: AboutComponent },
   { path: 'login', component: LoginPageComponent },
   { path: 'search', component: SearchComponent },
   { path: 'test', component: TestComponent },
   //{ path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: '', component: HomeComponent },
   { path: 'home', component: HomeComponent },
   { path: 'signup', component: SignupPageComponent  }
];

@NgModule({

  imports: [BrowserModule,Ng2CompleterModule ,HttpModule,
    RouterModule.forRoot(appRoutes),FormsModule
    ,ReactiveFormsModule, InfiniteScrollModule],
  
  declarations: [AppComponent,AboutComponent,
     HomeComponent,LoginComponent, LoginModalComponent,LoginPageComponent,
   SignupComponent,SignupModalComponent,SignupPageComponent,
   SearchGamesComponent,AlertComponent, SearchComponent, TestComponent
    ],

  providers :[
    SearchGamesService,
    LoginService,
    AuthGuard,AlertService,
    BaseRequestOptions ,
    UserService,
    GameService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    AlertService
  ],

  bootstrap: [AppComponent]
  
})

export class AppModule {}