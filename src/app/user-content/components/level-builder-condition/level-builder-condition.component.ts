import { Component, OnDestroy, OnInit } from '@angular/core';
import { Level } from '../../objects/Level';
import { LevelManipulationService } from '../../services/level-manipulation.service';

@Component({
  selector: 'app-level-builder-condition',
  templateUrl: './level-builder-condition.component.html',
  styleUrls: [
  './level-builder-condition.component.css',
  "../level-builder/level-builder.component.css",
  '../circuits/circuits.component.css'
]
})
export class LevelBuilderConditionComponent implements OnInit, OnDestroy {

  displayError = false
  level : Level = new Level()
  newTest = {name : "", inputs:"", outputs:""}

  constructor(private levelManipulation : LevelManipulationService) { 
  }

  ngOnInit(): void {
    this.level = this.levelManipulation.level
    this.levelManipulation.saveLocalLevel()
  }

  ngOnDestroy(): void {
    this.levelManipulation.saveLocalLevel()
  }


  changeStage()
  {
    this.levelManipulation.changeStage("LevelStart",true)
  }

  addTest()
  {
    if(this.level.validTest(this.newTest))
    {
      console.log(this.newTest)
      this.levelManipulation.addTest(this.newTest)
      this.displayError = false
    }
    else
    {
      this.displayError = true
    }

  }

}
