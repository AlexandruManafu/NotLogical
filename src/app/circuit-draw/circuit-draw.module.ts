import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule} from '@angular/cdk/drag-drop';

import { ComponentsCreateDropdownComponent } from './components/components-create-dropdown/components-create-dropdown.component';
import { ComponentsToolbarComponent } from './components/components-toolbar/components-toolbar.component';
import { GateCreateComponent } from './components/gate-create/gate-create.component';
import { GateDeleteDropComponent } from './components/gate-delete-drop/gate-delete-drop.component';
import { GateDisplayComponent } from './components/gate-display/gate-display.component';
import { SimulationPlayBarComponent } from './components/simulation-play-bar/simulation-play-bar.component';
import { TestCanvasComponent } from './components/test-canvas/test-canvas.component';
import { WireDisplayComponent } from './components/wire-display/wire-display.component';
import { SimulationModule } from '../simulation/simulation.module';
import { FormsModule } from '@angular/forms';
import { CircuitComponent } from './components/circuit/circuit.component';


@NgModule({
  declarations: [
    ComponentsCreateDropdownComponent,
    ComponentsToolbarComponent,
    GateCreateComponent,
    GateDeleteDropComponent,
    GateDisplayComponent,
    SimulationPlayBarComponent,
    TestCanvasComponent,
    WireDisplayComponent,
    CircuitComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    SimulationModule,
    FormsModule
  ],
  exports:[
  ]
})
export class CircuitDrawModule { }
