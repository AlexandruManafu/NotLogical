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
  load = false
  buttonDegrees = 0
  menuHeight = 7

  constructor(
    private levelManipulation:LevelManipulationService,
    private overlayToggle : OverlayToggleService,
    private circuitManipulation : CircuitManipulationService,
    private windowManager : WindowManagerService,
    private wireDraw : WiringDrawService,
    private levelShare : LevelShareService
    ) { }

  ngOnInit(): void {
    let previewCircuit = localStorage.getItem("levelPreview")
    let levelStart = localStorage.getItem("levelStartCircuit")
    if((previewCircuit == undefined && levelStart!) || (previewCircuit! && JSON.parse(previewCircuit!).gates.length == 0 && levelStart!))
    {
      console.log("here")
      this.circuitManipulation.loadCircuit(JSON.parse(levelStart))
    }
    else if(previewCircuit!)
    {
      this.circuitManipulation.loadCircuit(JSON.parse(previewCircuit!))
    }
    console.log(this.circuitManipulation.builder)
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
    this.menuHeight = 30
    }
    else
    {
    this.buttonDegrees = 0
    this.menuHeight = 7
    }
  }

  reset()
  {
    let normalizedCircuit = localStorage.getItem("levelStartCircuit")
    if(normalizedCircuit!)
    {
      this.circuitManipulation.loadCircuit(JSON.parse(normalizedCircuit))
      localStorage.setItem("levelPreview",normalizedCircuit)
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
    localStorage.setItem("level",levelAsString)
    this.windowManager.openNewWindow("LevelTests")
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

  submit()
  {

  }


}