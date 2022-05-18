import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GeneralModule } from './general/general.module';
import { SimulationModule } from './simulation/simulation.module';
import { UserContentModule } from './user-content/user-content.module';
import { CircuitDrawModule } from './circuit-draw/circuit-draw.module';
import { WiringDrawService } from './circuit-draw/services/wiring-draw.service';
import { CircuitManipulationService } from './circuit-draw/services/circuit-manipulation.service';
import { HttpClientService } from './user-content/services/http-client.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GeneralModule,
    SimulationModule,
    UserContentModule,
    CircuitDrawModule
  ],
  providers: [WiringDrawService, CircuitManipulationService, HttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
