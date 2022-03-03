import { Component, Input, OnInit} from '@angular/core';
import { Gate } from '../../objects/gates/Gate';
import { VisualGateMoveService } from '../../services/visual-gate-move.service';

@Component({
  selector: 'app-gate-display',
  templateUrl: './gate-display.component.html',
  styleUrls: ['./gate-display.component.css']
})
export class GateDisplayComponent implements OnInit {
  @Input() gate : Gate | null = null
  @Input() isButton = false

  iconWidth = 0
  iconHeight = 0
  constructor(private gateMoveService : VisualGateMoveService) { }

  ngOnInit(): void {

  }
  getType()
  {
    return this.gate!.constructor.name
  }

  getPositionRender()
  {
    return this.gateMoveService.getDragRenderPos(this.gate!.inputs.length)
  }

  getWidthHeight()
  {
    return this.gateMoveService.getWidthHeight(this.gate!.inputs.length)
  }

}
