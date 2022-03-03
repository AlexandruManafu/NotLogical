import { Component, Input, OnInit } from '@angular/core';
import { VisualGateMoveService } from '../../services/visual-gate-move.service';

@Component({
  selector: 'app-gate-create',
  templateUrl: './gate-create.component.html',
  styleUrls: ['./gate-create.component.css']
})
export class GateCreateComponent implements OnInit {

  @Input() type = "";
  constructor(private gateMoveService : VisualGateMoveService) { }

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
    let numberInputs = this.getNumberInputs()
    return this.gateMoveService.getWidthHeight(numberInputs)
  }

  getPositionRender()
  {
    let numberInputs = this.getNumberInputs()
    return this.gateMoveService.getDragRenderPos(numberInputs)
  }

}
