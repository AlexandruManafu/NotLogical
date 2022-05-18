import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { CircuitManipulationService } from 'src/app/circuit-draw/services/circuit-manipulation.service';
import { LevelManipulationService } from '../../services/level-manipulation.service';

@Component({
  selector: 'app-level-builder-canvas-navigation',
  templateUrl: './level-builder-canvas-navigation.component.html',
  styleUrls: ['./level-builder-canvas-navigation.component.css','../level-builder-start/level-builder-start.component.css']
})
export class LevelBuilderCanvasNavigationComponent implements OnInit {

  @Input() previousPage = ""
  @Input() nextPage = ""

  constructor(private levelManipulation:LevelManipulationService, private circuitManipulation:CircuitManipulationService) { }

  ngOnInit(): void {
  }

  nextStage()
  {
    this.levelManipulation.changeStage(this.nextPage,true)
    this.circuitManipulation.saveCircuitLocally()
  }

  previouStage()
  {
    this.levelManipulation.changeStage(this.previousPage,true)
    this.circuitManipulation.saveCircuitLocally()
  }

}
