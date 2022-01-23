import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { AboutComponent } from './components/about/about.component';
import { NavigationToolbarComponent } from './components/navigation-toolbar/navigation-toolbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AboutComponent,
    NavigationToolbarComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    AboutComponent,
    NavigationToolbarComponent,
    PageNotFoundComponent
  ]
})
export class GeneralModule { }
