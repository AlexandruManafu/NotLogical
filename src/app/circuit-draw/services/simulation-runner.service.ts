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

  public action : string = ""
  simulator : Simulator | undefined = undefined;

  constructor(public circuitManipulation:CircuitManipulationService) {}

  simulate(id : string, value:boolean|string)
  {
    if(this.simulator!)
    {
      this.simulator.addInputEvent(id,value)
      this.simulator.simulate()
    }
  }

  setSimulator(type : string)
  {
    if(type == "Simulator")
      this.simulator = new Simulator()
    else if(type == "SimulatorStepByStep")
      this.simulator = new SimulatorStepByStep()
    if(this.simulator!)
    {
      let circuit = new Circuit(this.circuitManipulation.builder)
      this.simulator.circuit = circuit
    }
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

  simulateStepByStep()
  {
    if(this.action!="stepByStep started")
    {
      this.setSimulator("SimulatorStepByStep")
      this.createInputEvents()
      this.action = "stepByStep started"
    }
    this.simulator!.simulate()
    this.circuitManipulation.wireDraw.changeWireState({id:'everyWire',state:true})
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
    this.setSimulator("Simulator")
    this.circuitManipulation.resetWireColors()
  }
}
