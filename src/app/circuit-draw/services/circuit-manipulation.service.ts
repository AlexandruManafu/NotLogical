import { Injectable } from '@angular/core';
import { CircuitBuilder } from 'src/app/simulation/objects/creational/CircuitBuilder';
import { Gate } from 'src/app/simulation/objects/gates/Gate';
import { ArrayUtils } from 'src/app/simulation/objects/utils/ArrayUtils';
import { GateSearch } from 'src/app/simulation/objects/utils/GateSearch';
import { VisualGateMoveService } from './visual-gate-move.service';
import { WiringDrawService } from './wiring-draw.service';

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
  constructor(public gateMoveService : VisualGateMoveService, private wireDraw : WiringDrawService) { }

  public addGate(position : any)
  {
    //console.log("add")
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

  private redrawWires()
  {
    console.log("redraw")
    let wires = this.builder.wires
    let id = this.targetGate!.Id
    let connectedWires = GateSearch.getWiresByIO(wires,id,false)
    connectedWires.push(...GateSearch.getWiresByIO(wires,id,true))
    console.log(connectedWires)
    for(let i = 0;i<connectedWires.length;i++)
    {
      console.log(connectedWires[i])
      this.wireDraw.buildPath(connectedWires[i])
    }
  }

  public moveGate(position : any)
  { 
    //console.log("move")
    let originalPosition = position
    let numberInputs = this.targetGate!.inputs.length
    let newPosition = this.gateMoveService.computeSnapPosition(position,numberInputs)
    let isPositionOccupied = this.gateMoveService.isPositionOccupied(this.builder.gates,newPosition,numberInputs)
    let outOfCanvas = newPosition[0] < 0 || newPosition[1] < 0
    if(outOfCanvas)
      this.builder.removeGate(this.targetGate!.Id)
    else if(isPositionOccupied)
    {
      originalPosition.x += 100
      this.moveGate(originalPosition)
    }
    else
    {
      this.targetGate!.positionXY=newPosition
      this.redrawWires()
    }
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
        this.builder = this.builder.wire(newId,this.incomingGateWiring,this.outgoingGateWiring,this.outgoingGatePosition)
        this.resetWiringData()
      }
    }catch{
      //If wire exists already remove it
      this.removeWire()
      this.resetWiringData()
    }
    //console.log(this.builder.Wires)
  }

  setIncomingWiring(id : string)
  {
    try{

      this.incomingGateWiring = id
      if(this.outgoingGateWiring != "" && this.outgoingGateWiring != id)
      {
        let newId = id+this.outgoingGateWiring+this.outgoingGatePosition
        this.builder = this.builder.wire(newId,this.incomingGateWiring,this.outgoingGateWiring,this.outgoingGatePosition)
        this.resetWiringData()
      }
      //console.log(this.builder.Wires)
    }catch{
      this.removeWire()
      this.resetWiringData()
    }
  }

  private removeWire(){
    //console.log("remove")
    let removeId = this.incomingGateWiring + this.outgoingGateWiring + this.outgoingGatePosition
    //console.log(removeId)
    this.builder.removeWire(removeId)
  }

  resetWiringData()
  {
    this.outgoingGatePosition = -1
    this.outgoingGateWiring = ""
    this.incomingGateWiring = ""
  }

  resetWireColors()
  {
    this.wireDraw.changeWireState({id:"everyWire",state:"u"})
  }


}
