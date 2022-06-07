import { Component, Input, OnInit } from '@angular/core';
import { CircuitManipulationService } from 'src/app/circuit-draw/services/circuit-manipulation.service';
import { WiringDrawService } from 'src/app/circuit-draw/services/wiring-draw.service';
import { WindowManagerService } from 'src/app/general/services/window-manager.service';
import { Circuit } from 'src/app/simulation/objects/Circuit';
import { LevelManipulationService } from '../../services/level-manipulation.service';
import { OverlayToggleService } from '../../services/overlay-toggle.service';

@Component({
  selector: 'app-level-builder-preview',
  templateUrl: './level-builder-preview.component.html',
  styleUrls: ['./level-builder-preview.component.css','../level-builder-start/level-builder-start.component.css']
})
export class LevelBuilderPreviewComponent implements OnInit {

  constructor(
    
    ) { }

  ngOnInit(): void {
    
  }
}


