import { Component, OnInit } from '@angular/core';
import { ConnectableObservable, Subscription } from 'rxjs';
import { CircuitManipulationService } from 'src/app/circuit-draw/services/circuit-manipulation.service';
import { LoginService } from 'src/app/general/services/login.service';
import { Level } from '../../objects/Level';
import { LevelManipulationService } from '../../services/level-manipulation.service';
import { LevelShareService } from '../../services/level-share.service';

@Component({
  selector: 'app-level-builder-save',
  templateUrl: './level-builder-save.component.html',
  styleUrls: [
  './level-builder-save.component.css',
  '../level-builder/level-builder.component.css',
  '../level-builder-start/level-builder-start.component.css',
  '../test-edit/test-edit.component.css'
]
})
export class LevelBuilderSaveComponent implements OnInit {

  level = new Level()
  constructor(
    private levelManipulation : LevelManipulationService,
    private levelShare : LevelShareService,
    private loginService : LoginService,
    private circuitManipulation : CircuitManipulationService
    ) { }

  ngOnInit(): void {
    this.level = this.levelManipulation.level
  }

  properTitle()
  {
    return !this.level.invalidName() && this.level.name.length > 1
  }

  properInstructions()
  {
    return !this.level.invalidInstructions() && this.level.instructions.length > 1
  }

  properCondition()
  {
    return this.level.tests.length > 0 
  }

  loggedIn()
  {
    return this.loginService.isUserLoggedIn()
  }

  saveIfValid()
  {
    if(this.level.firstStageValid() && this.properCondition() && this.loggedIn())
    {
      let partial = localStorage.getItem("newLevelPartialCircuit")
      if(partial == null || partial == undefined)
      {
        partial = this.circuitManipulation.getEmptyCircuit()
      }
      let object = {partial: partial, level : this.level}
      //console.log(object)

      this.levelShare.uploadLevel(object).subscribe(
        (response) => {
          console.log(response.body)
          if(response.body == "Level Upload Success")
          {
            this.removeTemporaryCircuits();
            this.levelManipulation.changeStage("Levels",true)
          }
        })
    }
  }

  removeTemporaryCircuits()
  {
        localStorage.removeItem("newLevel")
        localStorage.removeItem("newLevelCircuit")
        localStorage.removeItem("newLevelPartialCircuit")
  }


}
