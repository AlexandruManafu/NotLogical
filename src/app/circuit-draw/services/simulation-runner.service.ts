import { Injectable } from '@angular/core';
import { Circuit } from 'src/app/simulation/objects/Circuit';
import { InputGate } from 'src/app/simulation/objects/gates/InputGate';
import { Simulator } from 'src/app/simulation/objects/Simulator';
import { SimulatorStepByStep } from 'src/app/simulation/objects/SimulatorStepByStep';
import { CircuitManipulationService } from './circuit-manipulation.service';

@Injectable({
  providedIn: 'root'
})

export class SimulationRunnerService {

  public step : number = 0;
  public action : string = ""
  simulator : Simulator | undefined = undefined;
  public currentInputSum = -1

  constructor(public circuitManipulation:CircuitManipulationService) {}

  simulate(id : string, value:boolean|string)
  {
    if(this.simulator!)
    {
      console.log(this.circuitManipulation.builder)
      this.simulator.addInputEvent(id,value)
      console.log(this.simulator)
      this.simulator.simulate()
    }
  }

  prepareCircuit()
  {
    if(this.simulator!)
    {
      let circuit = new Circuit(this.circuitManipulation.builder)
      this.simulator.circuit = circuit
    }
  }

  setSimulator(type : string)
  {
    if(type == "Simulator")
      this.simulator = new Simulator()
    else if(type == "SimulatorStepByStep")
      this.simulator = new SimulatorStepByStep()
  }

  private createInputEvents()
  {
    let inputGates : Array<InputGate> = []
    if(this.simulator!)
      inputGates  = this.simulator.circuit!.getInputs()
    for(let i=0;i<inputGates.length;i++)
    {
      this.simulator!.addInputEvent(inputGates[i].Id,inputGates[i].State)
    }
  }

  private createInputEventsVector(vector : Array<boolean|string>)
  {
    let inputGates : Array<InputGate> = []
    if(this.simulator!)
      inputGates  = this.simulator.circuit!.getInputs()
    for(let i=0;i<inputGates.length;i++)
    {
      this.simulator!.addInputEvent(inputGates[i].Id,vector[i])
    }
  }

  simulateStepByStep(colorWires = true)
  {
    if(this.action!="stepByStep started")
    {
      this.setSimulator("SimulatorStepByStep")
      this.prepareCircuit()
      this.createInputEvents()
      this.action = "stepByStep started"
    }
    this.step++;
    this.simulator!.simulate()

    if(colorWires)
      this.circuitManipulation.wireDraw.changeWireState({id:"wires",state:false})

  }

  reset()
  {
    let gates = this.circuitManipulation.builder.gates
    this.action = ""
    for(let i = 0;i<gates.length;i++)
    {
      gates[i].reset()
    }
    if(this.simulator!)
    {
      this.simulator.reset()
    }
    this.currentInputSum = -1
    this.setSimulator("Simulator")
    this.circuitManipulation.resetWireColors()
  }

  nextInputs(arg : number)
  {
    let temp = new Circuit(this.circuitManipulation.builder)
    let vectorAndSum = temp.getNextVector(this.currentInputSum,arg)
    this.currentInputSum = vectorAndSum.sum

    console.log(vectorAndSum.sum)
    if(this.action!= "" && this.action!= "stepByStep started" && this.simulator!)
    {
      this.prepareCircuit()
      this.simulator.simulateVector(vectorAndSum.vector)
      this.circuitManipulation.wireDraw.changeWireState({id:"everyWire",state:true})
    }
    else
    {
      this.setSimulator("SimulatorStepByStep")
      this.prepareCircuit()
      this.createInputEventsVector(vectorAndSum.vector)
      this.action="stepByStep started"
      this.simulator!.setInputValues()
      console.log(this.simulator)
    }
  }
}
