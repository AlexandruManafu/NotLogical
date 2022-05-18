import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TestTable } from 'src/app/simulation/objects/TestTable';
import { ArrayUtils } from 'src/app/simulation/objects/utils/ArrayUtils';
import { Level } from '../objects/Level';

@Injectable({
  providedIn: 'root'
})
export class LevelManipulationService {


  public level : Level = new Level()
  constructor(private router : Router) {

    this.loadLocalLevel()
  }

  loadLocalLevel()
  {
    let object = localStorage.getItem("level")
    if(object!)
    {
      object = JSON.parse(object)
      this.level.loadFromObject(object)
    }
  }

  changeStage(stageId : string, useDifferentRoute : boolean = false)
  {
    if(!useDifferentRoute)
    this.router.navigate(["/LevelBuilder/"+stageId])
    else
    this.router.navigate([stageId])
  }

  public addTest(newTest : {name:string, inputs:string, outputs:string})
  {
    let inputs = newTest.inputs.replace(/\s+/g, " ");
    let outputs = newTest.outputs.replace(/\s+/g, " ");

    let inputList = inputs.split(" ")
    let outputList = outputs.split(" ")
    let test = new TestTable(inputList,outputList,newTest.name)
    this.level.tests.push(test)
    console.log(this.level)
  }

  public deleteTest(testTable:TestTable)
  {
    ArrayUtils.removeItem(testTable,this.level.tests)
  }
}
