import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Gate } from 'src/app/simulation/objects/gates/Gate';

import { CircuitManipulationService } from '../../services/circuit-manipulation.service';

@Component({
  selector: 'app-test-canvas',
  templateUrl: './test-canvas.component.html',
  styleUrls: ['./test-canvas.component.css']
})
export class TestCanvasComponent implements OnInit {

  canvasCellSizesXY = this.circuitManipulation.gateMoveService.CanvasGridSize

  constructor(private changeDetection : ChangeDetectorRef,
              public circuitManipulation : CircuitManipulationService) {
                this.circuitManipulation.setAutoSavePath("simulator")
              }


  ngOnInit(): void {    
  }

  onDrop(event : CdkDragDrop<Gate>)
  {
    //console.log(event)
    if(event.isPointerOverContainer && event.previousContainer.id != "canvas" && event.container.id == "canvas")
      this.circuitManipulation.addGate(event.dropPoint)
    else if(event.previousContainer.id == "canvas" && event.container.id == "canvas")
      this.circuitManipulation.moveGate(event.dropPoint)

    this.changeDetection.detectChanges()
    //console.log(this.circuitManipulation.builder.gates)
    //console.log(this.circuitManipulation.builder.Wires)
  }

  setTargetGate(gate : Gate)
  {
    this.circuitManipulation.targetGate = gate
  }

  customTB(index : number, gate : Gate) {
     return gate.positionXY;
  }
}
