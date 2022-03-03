import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestCanvasComponent } from './components/test-canvas/test-canvas.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { GateDisplayComponent } from './components/gate-display/gate-display.component';
import { GateCreateComponent } from './components/gate-create/gate-create.component';



@NgModule({
  declarations: [
    TestCanvasComponent,
    GateCreateComponent,
    GateDisplayComponent
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
