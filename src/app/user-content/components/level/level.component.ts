import { Component, Input, OnInit } from '@angular/core';
import { CircuitManipulationService } from 'src/app/circuit-draw/services/circuit-manipulation.service';
import { WiringDrawService } from 'src/app/circuit-draw/services/wiring-draw.service';
import { WindowManagerService } from 'src/app/general/services/window-manager.service';
import { Circuit } from 'src/app/simulation/objects/Circuit';
import { LevelManipulationService } from '../../services/level-manipulation.service';
import { LevelShareService } from '../../services/level-share.service';
import { OverlayToggleService } from '../../services/overlay-toggle.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css', '../level-builder-start/level-builder-start.component.css']
})
export class LevelComponent implements OnInit {

  @Input() simulationBarTitle = "Shared Level"
  @Input() levelPath = "level"
  @Input() levelCircuitPath = "levelCircuit"
  @Input() levelPartialCircuitPath = "levelPartialCircuit"

  load = false
  buttonDegrees = 180
  menuHeight = 7

  constructor(
    public levelManipulation:LevelManipulationService,
    private overlayToggle : OverlayToggleService,
    private circuitManipulation : CircuitManipulationService,
    private windowManager : WindowManagerService,
    private wireDraw : WiringDrawService,
    private levelShare : LevelShareService
    ) { }

  ngOnInit(): void {
    let previewCircuit = localStorage.getItem(this.levelCircuitPath)
    let levelStart = localStorage.getItem(this.levelPartialCircuitPath)
    if((previewCircuit == undefined && levelStart!) || (previewCircuit! && JSON.parse(previewCircuit!).gates.length == 0 && levelStart!))
    {
      this.circuitManipulation.loadCircuit(JSON.parse(levelStart))
    }
    else if(previewCircuit!)
    {
      this.circuitManipulation.loadCircuit(JSON.parse(previewCircuit!))
    }
    console.log(this.circuitManipulation.builder)

    this.levelManipulation.levelPath = this.levelPath
    this.levelManipulation.loadLocalLevel()
  }

  getLevelTitle()
  {
    return this.levelManipulation.level.name
  }

  getLevelDescription()
  {
    return this.levelManipulation.level.instructions
  }

  showLevelOptions()
  {
    if(this.buttonDegrees == 0)
    {
    this.buttonDegrees = 180
    this.menuHeight = 7
    }
    else
    {
    this.buttonDegrees = 0
    this.menuHeight = 33
    }
  }

  reset()
  {
    let normalizedCircuit = localStorage.getItem(this.levelPartialCircuitPath)
    if(normalizedCircuit!)
    {
      this.circuitManipulation.loadCircuit(JSON.parse(normalizedCircuit))
      localStorage.setItem(this.levelCircuitPath,normalizedCircuit)
    }

    this.showLevelOptions()
  }

  viewDescription()
  {
    this.overlayToggle.changeTargetEntry("levelDescription")
    this.showLevelOptions()
  }

  viewSpecifications()
  {
    let level = this.levelManipulation.level
    level.circuit = new Circuit (this.circuitManipulation.builder)

    let isCorrect = level.executeTests()
    this.wireDraw.changeWireState({id:"everyWire",state:"u"})
    let levelAsString = JSON.stringify(level)
    localStorage.setItem(this.levelPath,levelAsString)
    this.windowManager.openNewWindow("LevelTests/"+this.levelPath)
    this.showLevelOptions()
    if(isCorrect && level.id >= 0)
    {
      this.levelShare.incrementNumberCorrect(level.id).subscribe(
        (response) => {
          console.log(response)
        }
      )
    }
  }

  delete()
  {
    this.levelShare.deleteLevel(this.levelManipulation.level.id.toString()).subscribe(
      (response) => {
        console.log(response)
        if(response.body == "Success")
        {
          this.levelManipulation.changeStage("/Levels",true)
        }
      })
  }


}
