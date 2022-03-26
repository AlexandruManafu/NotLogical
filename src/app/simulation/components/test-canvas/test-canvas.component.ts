import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GateFactory } from '../../objects/creational/GateFactory';
import { Gate } from '../../objects/gates/Gate';
import { ArrayUtils } from '../../objects/utils/ArrayUtils';
import { GateSearch } from '../../objects/utils/GateSearch';
import { Wire } from '../../objects/Wire';
import { CircuitManipulationService } from '../../services/circuit-manipulation.service';
import { VisualGateMoveService } from '../../services/visual-gate-move.service';

@Component({
  selector: 'app-test-canvas',
  templateUrl: './test-canvas.component.html',
  styleUrls: ['./test-canvas.component.css']
})
export class TestCanvasComponent implements OnInit {

  canvasCellSizesXY = this.circuitManipulation.gateMoveService.CanvasGridSize

  constructor(private changeDetection : ChangeDetectorRef,
              public circuitManipulation : CircuitManipulationService) { }


  ngOnInit(): void {    
  }

  onDrop(event : CdkDragDrop<Gate>)
  {
    console.log(event)
    if(event.isPointerOverContainer && event.previousContainer.id != "canvas" && event.container.id == "canvas")
      this.circuitManipulation.addGate(event.dropPoint)
    else if(event.previousContainer.id == "canvas" && event.container.id == "canvas")
      this.circuitManipulation.moveGate(event.dropPoint)

    this.changeDetection.detectChanges()
    console.log(this.circuitManipulation.builder.gates)
    console.log(this.circuitManipulation.builder.Wires)
  }

  setTargetGate(gate : Gate)
  {
    this.circuitManipulation.targetGate = gate
  }

  customTB(index : number, gate : Gate) {
     return gate.positionXY;
  }
}
