import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CircuitManipulationService } from 'src/app/circuit-draw/services/circuit-manipulation.service';
import { Level } from '../../objects/Level';
import { LevelManipulationService } from '../../services/level-manipulation.service';
import { LevelShareService } from '../../services/level-share.service';

@Component({
  selector: 'app-level-remote',
  templateUrl: './level-remote.component.html',
  styleUrls: ['./level-remote.component.css']
})
export class LevelRemoteComponent implements OnInit, OnDestroy {

  constructor(
    private levelShare : LevelShareService,
    private activatedRoute : ActivatedRoute,
    private circuitManipulation : CircuitManipulationService,
    private levelManipulation : LevelManipulationService) { }

  idSub = new Subscription()
  id : string | null = null
  loaded : boolean = false;


  ngOnInit(): void {
    this.idSub = this.activatedRoute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    });

    if(this.id!)
    {
      //get circuit from server
      try{
      this.levelShare.getLevel(this.id).subscribe(
        (response) => {
          console.log(response)
          let obj = JSON.parse(JSON.stringify(response))
          if(obj.body != "GET circuit Failed" && obj.body != "No permissions")
          {
            let content = JSON.parse(JSON.stringify(response))
            let levelStartPath = this.levelManipulation.levelPartialCircuitPath
            localStorage.setItem(levelStartPath, JSON.stringify(content.partialSolution))

            console.log(content)
            this.levelManipulation.level.id = content.id
            this.levelManipulation.level.name = content.name,
            this.levelManipulation.level.instructions = content.instructions,
            this.levelManipulation.level.tests = content.tests,
            this.levelManipulation.saveLocalLevel()
            this.loaded = true
          }
          else{
            this.loaded = false;
          }
        })
      }catch(e)
      {
        console.log(e)
      }
    }
  }

  ngOnDestroy(): void {
    this.levelManipulation.level = new Level()
  }



}
