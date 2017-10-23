import { NgModule } from '@angular/core';
import {NgForm} from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
//import { AuthModule } from 'angular2-auth';
import  {AboutComponent} from "./about/about.component";
import { HomeComponent } from './home/home.component';
import { LoginModalComponent } from './loginModal/loginModal.component';
import { AppComponent } from './app.component';
import { SignupComponent } from "./signup/signup.component";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { TestComponent } from "./test/test.component";
import {SignupModalComponent} from "./signupModal/signupModal.component";
import { SearchGameComponent } from "./searchGame/searchGame.component";
import { SearchComponent} from "./search/search.component"
import { Ng2CompleterModule } from "ng2-completer";
import {LoginPageComponent} from './loginPage/loginPage.component'
import {SignupPageComponent} from './signupPage/signupPage.component'
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
  imports: [BrowserModule,Ng2CompleterModule ,HttpModule,RouterModule.forRoot(appRoutes),FormsModule
    ,ReactiveFormsModule, InfiniteScrollModule],
  
  declarations: [AppComponent,SignupComponent ,AboutComponent,
    LoginComponent, HomeComponent, LoginModalComponent,
    SignupComponent,SignupModalComponent,SearchGameComponent,
    LoginPageComponent,SignupPageComponent, SearchComponent, TestComponent],
  bootstrap: [AppComponent]

  
})
export class AppModule {}