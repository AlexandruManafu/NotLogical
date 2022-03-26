import { Component, OnInit } from '@angular/core';
import { CircuitManipulationService } from '../../services/circuit-manipulation.service';

@Component({
  selector: 'app-components-toolbar',
  templateUrl: './components-toolbar.component.html',
  styleUrls: ['./components-toolbar.component.css']
})
export class ComponentsToolbarComponent implements OnInit {

  IOTypes = this.circuitManipulation.IOGateTypes;
  gateTypes = this.circuitManipulation.gateTypes;
  displayIO = "inline-block"
  displayGates = "inline-block"
  
  constructor(private circuitManipulation:CircuitManipulationService) { }

  ngOnInit(): void {
  }

  toggleAllCallback()
  {
    
  }

}
