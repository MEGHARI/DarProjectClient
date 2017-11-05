import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {NavbarAdminComponent} from "./navbar/navbar.component" 
import {HomeAdminComponent,HomeService} from "./home/index"
const appRoutes: Routes = [
    { path:"admin/home",component:HomeAdminComponent }
]
@NgModule({
    declarations: [NavbarAdminComponent,HomeAdminComponent],
    imports: [ CommonModule,RouterModule.forRoot(appRoutes) ],
    exports: [NavbarAdminComponent,HomeAdminComponent],
    providers: [HomeService],
})
export class AdminModule {}