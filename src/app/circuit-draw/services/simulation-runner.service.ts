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

  simulateStepByStep()
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

    this.circuitManipulation.wireDraw.changeWireState({id:"wires",state:true})

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
