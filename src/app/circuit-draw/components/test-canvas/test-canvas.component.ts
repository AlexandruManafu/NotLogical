import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CircuitBuilder } from 'src/app/simulation/objects/creational/CircuitBuilder';
import { Gate } from 'src/app/simulation/objects/gates/Gate';

import { CircuitManipulationService } from '../../services/circuit-manipulation.service';

@Component({
  selector: 'app-test-canvas',
  templateUrl: './test-canvas.component.html',
  styleUrls: ['./test-canvas.component.css']
})
export class TestCanvasComponent implements OnInit, OnDestroy {

  canvasCellSizesXY = this.circuitManipulation.gateMoveService.CanvasGridSize
  idSub = new Subscription()
  id : string | null = null
  @Input() savePath = "simulator"
  @Input() title = "Local Circuit"
  @Input() loadLocalAutomatically = false

  constructor(private changeDetection : ChangeDetectorRef,
              public circuitManipulation : CircuitManipulationService,
              private activatedRoute : ActivatedRoute
              ) {
              }


  ngOnInit(): void {
    this.circuitManipulation.setAutoSavePath(this.savePath)
    this.idSub = this.activatedRoute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
    });

    if(this.id==null && this.loadLocalAutomatically)
    {
      this.circuitManipulation.loadLocalCircuit();
    }
  }

  ngOnDestroy(): void {
    this.idSub.unsubscribe()
    this.circuitManipulation.builder = new CircuitBuilder()
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
     return gate.position;
  }
}
