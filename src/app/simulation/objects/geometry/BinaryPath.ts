import { Wire } from "../Wire"
import { Point } from "./Point"
import { Segment } from "./Segment"
import { SegmentBuilder } from "./SegmentBuilder"
import { UnaryPath } from "./UnaryPath"
export class BinaryPath extends UnaryPath{

  constructor(override cellWidth : number,override cellHeight : number)
  {
    super(cellWidth,cellHeight)
  }

  override getEndPoint(wire : Wire)
  {
    let yMiddle = this.cellHeight/2
    let xMiddle = this.cellWidth/7
    let x = wire.outgoing.position.x + xMiddle + wire.outgoing.inputVisualWireCorrection
    let y = wire.outgoing.position.y + yMiddle - 3
    

    if(wire.OutPosition==0)
      y -=yMiddle/2
    else
      y += yMiddle/2

    return new Point(x,y)
  }

  override getXMiddlePoint(wire : Wire)
  {
    let mid = this.cellWidth/2
    let x = (wire.outgoing.position.x + wire.incoming.position.x + mid) / 2

    return x
  }
  override getYMiddlePoint(wire : Wire)
  {
    let mid = this.cellHeight
    let y = (wire.outgoing.position.y + wire.incoming.position.y + mid) / 2 - 2.5
    if(wire.OutPosition==0)
      y -=mid/4
    else
      y += mid/4

    return y
  }

  override path(path : SegmentBuilder, wire : Wire) : SegmentBuilder
  {
    let newPath = path
    let start = this.getStartingPoint(wire)
    newPath.Cursor = start
    let mid = new Point (this.getXMiddlePoint(wire)+1,start.y)
    let end = this.getEndPoint(wire)
    let distance = Math.sqrt((wire.incoming.position.x-wire.outgoing.position.x)**2)

    if(wire.incoming.inputs.length==2 && distance <= this.cellWidth)
    {
      newPath = newPath.top(end).side(end)
    }
    else
      newPath = newPath.side(mid).top(end).side(end)
    
    return newPath
  }

  override pathBack(path : SegmentBuilder, wire : Wire) : SegmentBuilder
  {
    let pathYBackwards = wire.incoming.position.y<=wire.outgoing.position.y
    let outgoingAbove = wire.outgoing.position.y<wire.incoming.position.y
    let newPath = path
    let start = this.getStartingPoint(wire)
    let gap = new Point(start.x+2,start.y)
    newPath.Cursor = start

    let mid = new Point(start.x, this.getYMiddlePoint(wire) - this.cellHeight/4)
    let secondGap = this.getEndPoint(wire)
    secondGap = new Point(secondGap.x-2.5,secondGap.y)
    let end = this.getEndPoint(wire)
    if(pathYBackwards)
    end = new Point(end.x,end.y+5)

    
    if(wire.OutPosition==0)
    {
      mid = new Point(mid.x,secondGap.y - this.cellHeight/4)
    }
    
    if(outgoingAbove && wire.OutPosition==0)
    {
      mid = new Point(mid.x,mid.y+this.cellHeight)
      secondGap = new Point(secondGap.x - this.cellWidth/8, secondGap.y)
    }
    else if(!outgoingAbove && wire.OutPosition == 1)
    {
      secondGap = new Point(secondGap.x - this.cellWidth/8, secondGap.y)
    }

    try{
    newPath = newPath.side(gap).top(mid).side(secondGap).top(end).side(end)
    }catch(e)
    {
      console.log(e)
    }
    
    return newPath
  }

  override pathLoop(path : SegmentBuilder, wire : Wire) : SegmentBuilder
  {

    let cellHeight = this.cellHeight
    let newPath = path
    let start = this.getStartingPoint(wire)
    let gap = new Point(start.x+2,start.y)
    newPath.Cursor = start

    let topCell = new Point(start.x, start.y+(cellHeight/2))
    let secondGap = this.getEndPoint(wire)
    secondGap = new Point(secondGap.x-2,secondGap.y)
    let end = this.getEndPoint(wire)
    if(wire.OutPosition==0)
    {
      secondGap = new Point(secondGap.x - this.cellWidth/8, secondGap.y)
    }

    try{
    newPath = newPath.side(gap).top(topCell).side(secondGap).top(secondGap).side(end)
    }catch(e)
    {
      console.log(e)
    }
    
    return newPath
  }

  override pathUp(path : SegmentBuilder, wire : Wire) : SegmentBuilder
  {
    let newPath = path
    let start = this.getStartingPoint(wire)
    newPath.Cursor = start
    let gap = new Point(start.x+2,start.y)
    let mid = new Point(this.getXMiddlePoint(wire) - this.cellWidth/8,this.getYMiddlePoint(wire))
    let end = this.getEndPoint(wire)
    if(wire.OutPosition==0)
    {
      mid = new Point(mid.x - this.cellWidth/8,mid.y)
    }
    let yDistance = this.yDistance(wire)
    if(yDistance<=this.cellHeight)
    {
      return this.pathBack(path,wire)
    }

    newPath = newPath.side(gap).top(mid).side(mid).top(end).side(end)
    
    return newPath
  }

  override buildPath(wire : Wire)
  {
    try{
    let sameY = wire.incoming.position.y == wire.outgoing.position.y
    let xDistance = Math.sqrt((wire.incoming.position.x-wire.outgoing.position.x)**2)
    let pathXBackwards = wire.incoming.position.x>=wire.outgoing.position.x
    let sameX = wire.incoming.position.x == wire.outgoing.position.x
    let path = new SegmentBuilder(this.cellHeight,this.cellWidth)

    //console.log("x distance "+xDistance)
    if(sameY && pathXBackwards)
    {
      //console.log("sameYBack")
      path = this.pathLoop(path,wire)
    }
    else if(sameX)
    {
      //console.log("up")
      path = this.pathUp(path,wire)
    }
    else if(pathXBackwards)
    {
      //console.log("back")
      path = this.pathBack(path,wire)
    }
    else
    {
      //console.log("regular")
      path = this.path(path,wire)
    }
    wire.xSegments = path.xSegments
    wire.ySegments = path.ySegments
    }catch(e)
    {
      console.log(e)
    }
  }


}