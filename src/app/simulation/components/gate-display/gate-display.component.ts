import { Component, Input, OnInit} from '@angular/core';
import { Gate } from '../../objects/gates/Gate';
import { CircuitManipulationService } from '../../services/circuit-manipulation.service';
import { SimulationRunnerService } from '../../services/simulation-runner.service';

@Component({
  selector: 'app-gate-display',
  templateUrl: './gate-display.component.html',
  styleUrls: ['./gate-display.component.css']
})
export class GateDisplayComponent implements OnInit {
  @Input() gate : Gate | null = null

  iconWidth = 0
  iconHeight = 0
  constructor(private simulationRunner:SimulationRunnerService) { }

  ngOnInit(): void {

  }
  getType()
  {
    return this.gate!.constructor.name
  }
  getNumberInputs()
  {
    return this.gate!.inputs.length
  }

  getState()
  {
    let state = this.gate!.State;
    if(typeof state === "string")
      return state.toUpperCase();
    else if(state)
      return 1;
    else
      return 0;
  }

  getPositionRender()
  {
    let gateMove = this.simulationRunner.circuitManipulation.gateMoveService
    return gateMove.getDragRenderPos(this.gate!.inputs.length)
  }

  getWidthHeight()
  {
    let gateMove = this.simulationRunner.circuitManipulation.gateMoveService
    return gateMove.getWidthHeight(this.gate!.inputs.length)
  }

  computeNextState(state : boolean|string)
  {
    let newState : boolean | string = "u"
    if(typeof state=="string")
        newState = true
    else if(state)
        newState = !state
    return newState
  }

  onClickInput()
  {
    if(this.getType() != "InputGate")
      return

    let state = this.gate!.State
    let simulating = this.simulationRunner.action == 'waitingForInput'
    let nextState = this.computeNextState(state)
    if(!simulating) 
      this.gate!.addInput(nextState,0)
    else{
      if(this.simulationRunner.simulator == undefined)
        this.simulationRunner.setSimulator("Simulator")
      this.simulationRunner.simulate(this.gate!.Id,nextState)
    }
  }

  setWireOutgoing(position : number)
  {
    console.log(position)
    let id = this.gate!.Id
    this.simulationRunner.circuitManipulation.setOutgoingWiring(id,position)
  }

  setWireIncoming()
  {
    console.log("inc")
    let id = this.gate!.Id
    this.simulationRunner.circuitManipulation.setIncomingWiring(id)
  }

}
