import { Component, OnInit } from '@angular/core';
import { SimulationRunnerService } from '../../services/simulation-runner.service';

@Component({
  selector: 'app-simulation-play-bar',
  templateUrl: './simulation-play-bar.component.html',
  styleUrls: ['./simulation-play-bar.component.css']
})
export class SimulationPlayBarComponent implements OnInit {

  constructor(public simulationRunner : SimulationRunnerService) { }

  ngOnInit(): void {
  }

  resetCircuit()
  {
    this.simulationRunner.reset()
  }

  simulateCircuit()
  {
    if(this.simulationRunner.action == "waitingForInput")
      this.simulationRunner.action = ""
    else
      this.simulationRunner.action = "waitingForInput"
  }

  simulateOneStep()
  {
    this.simulationRunner.simulateStepByStep()
  }

}
