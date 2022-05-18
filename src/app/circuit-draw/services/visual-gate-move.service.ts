
import { Injectable } from '@angular/core';
import { Gate } from 'src/app/simulation/objects/gates/Gate';
import { Point } from 'src/app/simulation/objects/geometry/Point';
import { ArrayUtils } from 'src/app/simulation/objects/utils/ArrayUtils';

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
            y: Math.floor(pos.y / 60) * 60 + 25};
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

  public getNumberInputs(gateName : string) : number
  {
    let unary = ["input","InputGate","output","OutputGate","not","NotGate"]
    if(unary.includes(gateName))
      return 1
    else
      return 2
  }

  public getWidthHeight(numberInputs:number)
  {
    if(numberInputs==1)
      return [60,60]
    else if(numberInputs==2)
      return [120,60]
    else
      throw new Error("Invalid number of inputs 1 or 2 expected given"+numberInputs)
  }

  computeSnapPosition(position:any, numberInputs : number) : Point
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
      y = Math.floor(position.y / widthHeight[1]) * widthHeight[1] - widthHeight[1]
    }

    return  {x:x,y:y}
  }

  isPositionOcupied(gateList : Array<Gate>, position : Point)
  {
    for(let i = 0;i<gateList.length;i++)
    {
      if(position.x == gateList[i].position.x && position.y == gateList[i].position.y )
        return true
    }
    return false
  }

  isCellOcupied(gateList : Array<Gate>,position : Point)
  {

    for(let i = 0;i<gateList.length;i++)
    {
      if(position.x == gateList[i].position.x && position.y == gateList[i].position.y)
        return true
      if(gateList[i].inputs.length == 2)
        return true
    }
    return false
  }

  getGatesInCell(gateList : Array<Gate>, newPosition: Point)
  {
    let result = []
    for(let i = 0;i<gateList.length;i++)
    {
      let x = gateList[i].position.x
      let y = gateList[i].position.y
      if(x > newPosition.x - this.canvasGridSize[0]/2 && x < newPosition.x + this.canvasGridSize[0]/2 && 
         y > newPosition.y - this.canvasGridSize[1] && y < newPosition.y + this.canvasGridSize[1])
          result.push(gateList[i])
    }
    return result
  }

  //Given a gate check in gate list if the position is occupied by another gate 
  public isPositionOccupied(gateList : Array<Gate>, position : Point , numberInputs : number)
  {
    let gatesInCell = this.getGatesInCell(gateList,position)
    return this.isCellOcupied(gatesInCell,position) || (numberInputs == 2 && gatesInCell.length !=0)
  }

}
