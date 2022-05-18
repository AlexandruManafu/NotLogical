import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircuitComponent } from './circuit-draw/components/circuit/circuit.component';
import { TestCanvasComponent } from './circuit-draw/components/test-canvas/test-canvas.component';
import { AboutComponent } from './general/components/about/about.component';
import { PageNotFoundComponent } from './general/components/page-not-found/page-not-found.component';
import { CircuitsComponent } from './user-content/components/circuits/circuits.component';
import { LevelBuilderPreviewComponent } from './user-content/components/level-builder-preview/level-builder-preview.component';
import { LevelBuilderStartComponent } from './user-content/components/level-builder-start/level-builder-start.component';
import { LevelBuilderComponent } from './user-content/components/level-builder/level-builder.component';
import { LevelsComponent } from './user-content/components/levels/levels.component';
import { LoginComponent } from './user-content/components/login/login.component';
import { LogoutComponent } from './user-content/components/logout/logout.component';
import { RegisterComponent } from './user-content/components/register/register.component';
import { TestsWithoutNavigationComponent } from './user-content/components/tests-without-navigation/tests-without-navigation.component';

const routes: Routes = [
  { path: 'About', component: AboutComponent },
  { path: 'Simulator', component: TestCanvasComponent },
  { path: 'Circuits', component: CircuitsComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'Sign-up', component: RegisterComponent},
  { path: 'Logout', component: LogoutComponent},
  { path: 'Circuit/:id', component: CircuitComponent},
  { path: 'Levels', component: LevelsComponent},
  { path: 'LevelBuilder/:stage', component: LevelBuilderComponent},
  { path: 'LevelStart', component: LevelBuilderStartComponent},
  { path: 'LevelPreview', component: LevelBuilderPreviewComponent},
  { path: 'LevelTests', component: TestsWithoutNavigationComponent},
  { path: '', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
