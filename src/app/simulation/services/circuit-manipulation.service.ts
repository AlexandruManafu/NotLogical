import { Injectable } from '@angular/core';
import { CircuitBuilder } from '../objects/creational/CircuitBuilder';
import { GateFactory } from '../objects/creational/GateFactory';
import { Gate } from '../objects/gates/Gate';
import { ArrayUtils } from '../objects/utils/ArrayUtils';
import { VisualGateMoveService } from './visual-gate-move.service';

@Injectable({
  providedIn: 'root'
})
export class CircuitManipulationService {

  public IOGateTypes : Array<string> = ["InputGate","OutputGate"]
  public gateTypes : Array<string> = ["NotGate","OrGate","AndGate","NorGate","XorGate"]
  //"NandGate","XnorGate"
  private index : number = 1;
  public targetGate : Gate | null = null
  public targetCreateGate : string = ""

  private incomingGateWiring : string = "";
  private outgoingGateWiring : string = "";
  private outgoingGatePosition : number = -1;

  public builder = new CircuitBuilder()
  constructor(public gateMoveService : VisualGateMoveService) { }

  public addGate(position : any)
  {
    console.log("add")
    let type = this.targetCreateGate
    let numberInputs = this.gateMoveService.getNumberInputs(type)
    let newPosition = this.gateMoveService.computeSnapPosition(position,numberInputs)
    let isPositionOccupied = this.gateMoveService.isPositionOccupied(this.builder.gates,newPosition,numberInputs)
    if(!isPositionOccupied)
    {
      this.builder = this.builder.gate(type,type+this.index,newPosition)
      this.index++
    }
  }

  public moveGate(position : any)
  { 
    console.log("move")
    let originalPosition = position
    let numberInputs = this.targetGate!.inputs.length
    let newPosition = this.gateMoveService.computeSnapPosition(position,numberInputs)
    let isPositionOccupied = this.gateMoveService.isPositionOccupied(this.builder.gates,newPosition,numberInputs)
    let outOfCanvas = newPosition[0] < 0 || newPosition[1] < 0
    if(outOfCanvas)
      ArrayUtils.removeItem(this.targetGate,this.builder.gates)
    else if(isPositionOccupied)
    {
      originalPosition.x += 100
      this.moveGate(originalPosition)
    }
    else
      this.targetGate!.positionXY=newPosition
  }
  
  //set the outgoing gate for the new wire, create the wire if incoming is set
  //vice-versa for function below
  setOutgoingWiring(id : string,position : number)
  {
    try{
      this.outgoingGateWiring = id
      this.outgoingGatePosition = position
      if(this.incomingGateWiring != "" && this.incomingGateWiring != id)
      {
        let newId = this.incomingGateWiring+id+position
        this.builder = this.builder.wire(newId,this.incomingGateWiring,id,position)
        this.resetWiringData()
      }
    }catch{
      //Error is expected if a wire is duplicated 
    }
    console.log(this.builder.Wires)
  }

  setIncomingWiring(id : string)
  {
    try{
      this.incomingGateWiring = id
      if(this.outgoingGateWiring != "" && this.outgoingGateWiring != id)
      {
        let newId = id+this.outgoingGateWiring+this.outgoingGatePosition
        this.builder = this.builder.wire(newId,this.incomingGateWiring,id,this.outgoingGatePosition)
        this.resetWiringData()
      }
      console.log(this.builder.Wires)
    }catch{
      //Error is expected if a wire is duplicated 
    }
  }

  resetWiringData()
  {
    this.outgoingGatePosition = -1
    this.outgoingGateWiring = ""
    this.incomingGateWiring = ""
  }


}
