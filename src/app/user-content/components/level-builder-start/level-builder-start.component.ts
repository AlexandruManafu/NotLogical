import { Component, OnInit } from '@angular/core';
import { LevelManipulationService } from '../../services/level-manipulation.service';

@Component({
  selector: 'app-level-builder-start',
  templateUrl: './level-builder-start.component.html',
  styleUrls: ['./level-builder-start.component.css']
})
export class LevelBuilderStartComponent implements OnInit {

  load = true
  constructor(private levelManipulation: LevelManipulationService) { }

  ngOnInit(): void {
  }

  nextStage()
  {
    this.levelManipulation.changeStage("/LevelPreview",true)
  }

}
