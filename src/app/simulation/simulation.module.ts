import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestCanvasComponent } from './components/test-canvas/test-canvas.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { GateDisplayComponent } from './components/gate-display/gate-display.component';
import { GateCreateComponent } from './components/gate-create/gate-create.component';
import { ComponentsToolbarComponent } from './components/components-toolbar/components-toolbar.component';
import { ComponentsCreateDropdownComponent } from './components/components-create-dropdown/components-create-dropdown.component';
import { GateDeleteDropComponent } from './components/gate-delete-drop/gate-delete-drop.component';
import { SimulationPlayBarComponent } from './components/simulation-play-bar/simulation-play-bar.component';



@NgModule({
  declarations: [
    TestCanvasComponent,
    GateCreateComponent,
    GateDisplayComponent,
    ComponentsToolbarComponent,
    ComponentsCreateDropdownComponent,
    GateDeleteDropComponent,
    SimulationPlayBarComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [
    TestCanvasComponent
  ]
})
export class SimulationModule { }
