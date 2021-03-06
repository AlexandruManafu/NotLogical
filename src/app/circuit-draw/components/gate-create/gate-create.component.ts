import { Component, Input, OnInit } from '@angular/core';
import { CircuitManipulationService } from '../../services/circuit-manipulation.service';

@Component({
  selector: 'app-gate-create',
  templateUrl: './gate-create.component.html',
  styleUrls: ['./gate-create.component.css']
})
export class GateCreateComponent implements OnInit {

  @Input() type = "";
  constructor(private circuitManipulation : CircuitManipulationService) { }

  ngOnInit(): void {

  }

  getNumberInputs()
  {
    if(this.type == "NotGate" || this.type == "InputGate" || this.type == "OutputGate")
      return 1
    else
      return 2
  }

  getWidthHeight()
  {
    let gateMoveService = this.circuitManipulation.gateMoveService
    let numberInputs = this.getNumberInputs()
    return gateMoveService.getWidthHeight(numberInputs)
  }

  getPositionRender()
  {
    let gateMoveService = this.circuitManipulation.gateMoveService
    let numberInputs = this.getNumberInputs()
    return gateMoveService.getDragRenderPos(numberInputs)
  }

  setTargetCreateGate(type : string)
  {
    this.circuitManipulation.targetCreateGate = type
  }

  public longToShortName(gateName : string)
  {
    if(gateName == "InputGate" || gateName == "OutputGate")
    return gateName.replace("Gate","");
    else
    return gateName.replace("Gate","").toUpperCase();
  }

}
