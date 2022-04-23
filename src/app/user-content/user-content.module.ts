import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './components/logout/logout.component';
import { CircuitsComponent } from './components/circuits/circuits.component';
import { CircuitEntryComponent } from './components/circuit-entry/circuit-entry.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoutComponent, CircuitsComponent, CircuitEntryComponent, SearchBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ]
}
)
export class UserContentModule { }
