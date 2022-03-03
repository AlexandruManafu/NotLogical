import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GateFactory } from '../../objects/creational/GateFactory';
import { Gate } from '../../objects/gates/Gate';
import { GateSearch } from '../../objects/utils/GateSearch';
import { Wire } from '../../objects/Wire';
import { VisualGateMoveService } from '../../services/visual-gate-move.service';

@Component({
  selector: 'app-test-canvas',
  templateUrl: './test-canvas.component.html',
  styleUrls: ['./test-canvas.component.css']
})
export class TestCanvasComponent implements OnInit {

  canvasCellSizesXY = this.gateMoveService.CanvasGridSize
  gateTypes : Array<string> = ["InputGate","NotGate","OrGate","AndGate","NorGate","XorGate"]//"NandGate","XnorGate"
  actualGates : Array<Gate> = []
  actualWires : Array<Wire> = []
  index : number = 1;
  targetGate : Gate | null = null

  constructor(private changeDetection : ChangeDetectorRef, private gateMoveService : VisualGateMoveService) { }


  ngOnInit(): void {    
  }

  onDrop(event : CdkDragDrop<Gate>)
  {
    console.log(event)
    if(event.isPointerOverContainer && event.previousContainer.id != "canvas")
      this.addGate(this.gateTypes[event.previousIndex], event.dropPoint)
    else
    {
      this.moveGate(event.dropPoint)
    }
    console.log(this.actualGates)

  }

  setTargetGate(gate : Gate)
  {
    this.targetGate = gate
  }

  private addGate(type: string, position : any)
  {
    let gate = GateFactory.createGateLongNames(type,type+this.index)
    if(position.x != 0 && position.y !=0)
    {
      let newPosition = this.gateMoveService.computeSnapPosition(position,gate.inputs.length)
      if(!this.gateMoveService.isPositionOccupied(this.actualGates,newPosition,gate.inputs.length))
      {
        gate.positionXY = newPosition
        this.index++
        this.actualGates.push(gate)
      }
    }
  }

  private moveGate(position : any)
  { 
    let originalPosition = position
    console.log("move")
    let numberInputs = this.targetGate!.inputs.length
    let newPosition = this.gateMoveService.computeSnapPosition(position,numberInputs)
    if(!this.gateMoveService.isPositionOccupied(this.actualGates,newPosition,numberInputs))
    {
      this.targetGate!.positionXY=newPosition
      this.changeDetection.detectChanges()
    }
    else
    {
      originalPosition.x += 100
      this.moveGate(originalPosition)
    }
  }

  customTB(index : number, gate : Gate) {
     return gate.positionXY;
  }
}
