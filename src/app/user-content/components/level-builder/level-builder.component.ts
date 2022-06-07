import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Level } from '../../objects/Level';
import { LevelManipulationService } from '../../services/level-manipulation.service';

@Component({
  selector: 'app-level-builder',
  templateUrl: './level-builder.component.html',
  styleUrls: ['./level-builder.component.css']
})
export class LevelBuilderComponent implements OnInit {

  level = new Level()
  stageSub = new Subscription()
  public stage : string| null = "1"
  public stages = [
    {
      id:"1",
      title:"Title and Instructions"
    },
    {
      id:"2",
      title:"Winning Condition"
    },
    {
      id:"3",
      title:"Partial Solution",
      redirect: "/LevelStart"
    },
    {
      id:"4",
      title:"Preview",
      redirect: "/LevelPreview"
    },
    {
      id:"5",
      title: "Save"
    }
  ]

  constructor(
    private activatedRoute : ActivatedRoute,
    private levelManipulation : LevelManipulationService) {
    
    }

  ngOnInit(): void {
    this.stageSub = this.activatedRoute.paramMap.subscribe(params => { 
      this.stage = params.get('stage'); 
    });

    this.level = this.levelManipulation.level
  }

  changeStage()
  {
    this.levelManipulation.changeStage("2")
  }

  switchStage(id:string)
  {
    if(id!= '3' && id!='4')
    {
      this.levelManipulation.changeStage(id)
    }else
    {
      let pathIndex = (parseInt(id)-1)
      if(this.stages[pathIndex]!)
      this.levelManipulation.changeStage(this.stages[pathIndex].redirect!,true)
    }
  }



}
