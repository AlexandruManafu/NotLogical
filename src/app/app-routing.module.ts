import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestCanvasComponent } from './circuit-draw/components/test-canvas/test-canvas.component';
import { AboutComponent } from './general/components/about/about.component';
import { PageNotFoundComponent } from './general/components/page-not-found/page-not-found.component';
import { CircuitsComponent } from './user-content/components/circuits/circuits.component';
import { LoginComponent } from './user-content/components/login/login.component';
import { LogoutComponent } from './user-content/components/logout/logout.component';
import { RegisterComponent } from './user-content/components/register/register.component';

const routes: Routes = [
  { path: 'About', component: AboutComponent },
  { path: 'Simulator', component: TestCanvasComponent },
  { path: 'Circuits', component: CircuitsComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'Sign-up', component: RegisterComponent},
  { path: 'Logout', component: LogoutComponent},
  { path: '', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
