import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestCanvasComponent } from './circuit-draw/components/test-canvas/test-canvas.component';
import { AboutComponent } from './general/components/about/about.component';
import { PageNotFoundComponent } from './general/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'About', component: AboutComponent },
  { path: 'Test', component: TestCanvasComponent },
  { path: '', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
