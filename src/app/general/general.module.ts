import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { AboutComponent } from './components/about/about.component';
import { NavigationToolbarComponent } from './components/navigation-toolbar/navigation-toolbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AboutComponent,
    NavigationToolbarComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [
    AboutComponent,
    NavigationToolbarComponent,
    PageNotFoundComponent
  ]
})
export class GeneralModule { }
