import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GeneralModule } from './general/general.module';
import { SimulationModule } from './simulation/simulation.module';
import { UserContentModule } from './user-content/user-content.module';
import { CircuitDrawModule } from './circuit-draw/circuit-draw.module';
import { LoginModule } from './login/login.module';
import { WiringDrawService } from './circuit-draw/services/wiring-draw.service';
import { CircuitManipulationService } from './circuit-draw/services/circuit-manipulation.service';

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
    LoginModule,
    CircuitDrawModule
  ],
  providers: [WiringDrawService, CircuitManipulationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
