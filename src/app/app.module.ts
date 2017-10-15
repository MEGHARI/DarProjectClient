import { NgModule } from '@angular/core';
import {NgForm} from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import  {AboutComponent} from "./about/about.component";
import { AppComponent } from './home/app.component';
import { InscriptionsComponent } from "./inscriptions/inscriptions.component";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
   { path: 'about', component: AboutComponent },
   { path: 'form', component: InscriptionsComponent }
];

@NgModule({
  imports: [BrowserModule,HttpModule,RouterModule.forRoot(appRoutes),FormsModule],
  declarations: [AppComponent,InscriptionsComponent,AboutComponent],
  bootstrap: [AppComponent]

  
})
export class AppModule {}

