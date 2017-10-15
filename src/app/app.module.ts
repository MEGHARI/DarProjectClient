import { NgModule } from '@angular/core';
import {NgForm} from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import  {AboutComponent} from "./+about/about.component";
import { AppComponent } from './app.component';
import { FormComponent } from "./+forms/form.component";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
   { path: 'about', component: AboutComponent },
   { path: 'form', component: FormComponent }
];

@NgModule({
  imports: [BrowserModule,HttpModule,RouterModule.forRoot(appRoutes),FormsModule],
  declarations: [AppComponent,FormComponent,AboutComponent],
  bootstrap: [AppComponent]

})
export class AppModule {}

