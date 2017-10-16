import { NgModule } from '@angular/core';
import {NgForm} from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import  {AboutComponent} from "./about/about.component";
import { HomeComponent } from './home/home.component';
import { LoginModalComponent } from './loginModal/loginModal.component';
import { AppComponent } from './app.component';
import { SignupComponent } from "./signup/signup.component";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import {SignupModalComponent} from "./signupModal/signupModal.component";

const appRoutes: Routes = [
   { path: 'about', component: AboutComponent },
   { path: 'login', component: LoginComponent },
   //{ path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: '', component: HomeComponent },
   { path: 'home', component: HomeComponent },
   { path: 'signup', component: SignupComponent  }
];

@NgModule({
  imports: [BrowserModule,HttpModule,RouterModule.forRoot(appRoutes),FormsModule
    ,ReactiveFormsModule],
  
  declarations: [AppComponent,SignupComponent ,AboutComponent,
    LoginComponent, HomeComponent, LoginModalComponent,SignupComponent,SignupModalComponent],
  bootstrap: [AppComponent]

  
})
export class AppModule {}

