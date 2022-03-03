import { Point } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Gate } from '../objects/gates/Gate';
import { InputGate } from '../objects/gates/InputGate';
import { OutputGate } from '../objects/gates/OutputGate';
import { ArrayUtils } from '../objects/utils/ArrayUtils';

@Injectable({
  providedIn: 'root'
})
export class VisualGateMoveService {

  private canvasGridSize = [120, 60]

  constructor() {

  }

  get CanvasGridSize()
  {
    return this.canvasGridSize
  }

  //Callback function that cannot access atributes
  computeDragRenderPosUnary(pos : any, dragRef : any):Point
   {
    return {x: Math.floor(pos.x / 60) * 60 + 25,
            y: Math.floor(pos.y / 20) * 20 + 10};
  }

  //Callback function that cannot access atributes
  computeDragRenderPosBinary(pos : any, dragRef : any):Point
   {
    return {x: Math.floor(pos.x / 120) * 120 + 45,
            y: Math.floor(pos.y / 60) * 60 + 25};
  }

  public getDragRenderPos(numberInputs:number)
  {
    if(numberInputs==1)
      return this.computeDragRenderPosUnary
    else if(numberInputs==2)
      return this.computeDragRenderPosBinary
    else
      throw new Error("Invalid number of inputs 1 or 2 expected given"+numberInputs)
  }

  public getWidthHeight(numberInputs:number)
  {
    if(numberInputs==1)
      return [60,20]
    else if(numberInputs==2)
      return [120,60]
    else
      throw new Error("Invalid number of inputs 1 or 2 expected given"+numberInputs)
  }

  computeSnapPosition(position:any, numberInputs : number)
  {
    let widthHeight = this.getWidthHeight(numberInputs)
    let x = position.x
    let y = position.y
    if(numberInputs==2)
    {
      x = Math.floor(position.x / widthHeight[0]) * widthHeight[0]
      y = Math.floor(position.y / widthHeight[1]) * widthHeight[1] - widthHeight[1]
    }
    else if(numberInputs==1)
    {
      x = Math.floor(position.x / widthHeight[0]) * widthHeight[0] 
      y = Math.floor(position.y / widthHeight[1]) * widthHeight[1] - widthHeight[1] * 3
    }

    return  [x,y]
  }

  isPositionOcupied(gateList : Array<Gate>, positionXY : Array<Number>)
  {
    for(let i = 0;i<gateList.length;i++)
    {
      if(ArrayUtils.arraysEqual(positionXY,gateList[i].positionXY))
        return true
    }
    return false
  }

  isCellOcupied(gateList : Array<Gate>,positionXY : Array<Number>)
  {

    for(let i = 0;i<gateList.length;i++)
    {
      if(ArrayUtils.arraysEqual(gateList[i].positionXY,positionXY))
        return true
      if(gateList[i].inputs.length == 2)
        return true
    }
    return false
  }

  getGatesInCell(gateList : Array<Gate>, newPositionXY: Array<number>)
  {
    let result = []
    for(let i = 0;i<gateList.length;i++)
    {
      let x = gateList[i].positionXY[0]
      let y = gateList[i].positionXY[1]


      if(
        x > newPositionXY[0]-this.canvasGridSize[0] && x < newPositionXY[0] + this.canvasGridSize[0] 
        && y > newPositionXY[1]-this.canvasGridSize[1] && y < newPositionXY[1] + this.canvasGridSize[1]
        )
        {
          result.push(gateList[i])
        }
    }

    return result
  }

  //Given a gate check in gate list if the position is occupied by another gate 
  public isPositionOccupied(gateList : Array<Gate>, positionXY : Array<number>, numberInputs : number)
  {
    let gatesInCell = this.getGatesInCell(gateList,positionXY)
    
    return this.isCellOcupied(gatesInCell,positionXY) || (numberInputs == 2 && gatesInCell.length !=0)

  }

}
