import { Component, OnInit } from '@angular/core';
import { CircuitManipulationService } from '../../services/circuit-manipulation.service';

@Component({
  selector: 'app-gate-delete-drop',
  templateUrl: './gate-delete-drop.component.html',
  styleUrls: ['./gate-delete-drop.component.css']
})
export class GateDeleteDropComponent implements OnInit {

  constructor(private circuitManipulation : CircuitManipulationService) { }
  ngOnInit(): void {
  }

  onDrop(event:any)
  {
    let targetGate = this.circuitManipulation.targetGate!.Id
    this.circuitManipulation.removeGate(targetGate)
  }

}
