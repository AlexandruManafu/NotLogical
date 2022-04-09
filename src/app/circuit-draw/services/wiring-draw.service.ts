import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BinaryPath } from 'src/app/simulation/objects/geometry/BinaryPath';
import { UnaryPath } from 'src/app/simulation/objects/geometry/UnaryPath';
import { Wire } from 'src/app/simulation/objects/Wire';
import { SegmentBuilder } from '../../simulation/objects/geometry/SegmentBuilder';
import { VisualGateMoveService } from './visual-gate-move.service';

@Injectable({
  providedIn: 'root'
})
export class WiringDrawService {

  constructor(private gateMoveService : VisualGateMoveService) { }

  private wireStateSend  = {id:"0",state:"u"}
  private wireStateSource = new BehaviorSubject<{id:string,state:string|boolean}>(this.wireStateSend)
  public wireStateMessage = this.wireStateSource.asObservable();

  changeWireState(message : {id:string,state:string|boolean})
  {
    this.wireStateSource.next(message);
  }

  //WIRES DRAW LEFT TO RIGHT, BOTTOM UP

  public buildPath(wire : Wire)
  {
    console.log("build")
    let outUnary = wire.outgoing.inputs.length == 1
    wire.xSegments = []
    wire.ySegments = []
    let width = this.gateMoveService.CanvasGridSize[0]
    let height = this.gateMoveService.CanvasGridSize[1]
    if(outUnary)
    {
      let path = new UnaryPath(width,height)
      path.buildPath(wire)
    }
    else
    { 
      let path = new BinaryPath(width,height)
      path.buildPath(wire)
    }
  }
}
