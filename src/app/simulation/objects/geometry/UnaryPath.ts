import { Wire } from "../Wire"
import { Point } from "./Point"
import { Segment } from "./Segment"
import { SegmentBuilder } from "./SegmentBuilder"

export class UnaryPath{

    constructor(protected cellWidth : number,protected cellHeight : number)
    {

    }

  protected getStartingPoint(wire : Wire) : Point
  {
    let xMiddle = this.cellWidth/2
    let yMiddle = this.cellHeight/2
    let x = wire.incoming.position.x + xMiddle - 5
    let y = wire.incoming.position.y + yMiddle - 3
    if(wire.incoming.inputs.length == 2)
    {
      x += xMiddle/2 + 10 + wire.incoming.outputVisualWireCorrection
    }

    return new Point(x,y)
  }

  protected getEndPoint(wire : Wire)
  {
    let yMiddle = this.cellHeight/2
    let x = wire.outgoing.position.x
    let y = wire.outgoing.position.y + yMiddle - 3

    return new Point(x,y)
  }

  protected getXMiddlePoint(wire : Wire)
  {
    let mid = this.cellWidth/2
    let x = (wire.outgoing.position.x + wire.incoming.position.x + mid) / 2

    return x
  }
  protected getYMiddlePoint(wire : Wire)
  {
    let mid = this.cellHeight
    let y = (wire.outgoing.position.y + wire.incoming.position.y + mid) / 2 - 2.5

    return y
  }

  protected pathStraight(path : SegmentBuilder, wire : Wire) : SegmentBuilder
  {
    let newPath = path    
    let seg = new Segment(this.getStartingPoint(wire), this.getEndPoint(wire))

    try{
    newPath.segment(seg)
    }catch(e){
      console.log(e)
    }

    return newPath
  }

  public path(path : SegmentBuilder, wire : Wire) : SegmentBuilder
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

  protected pathUp(path : SegmentBuilder, wire : Wire) : SegmentBuilder
  {
    let newPath = path
    let start = this.getStartingPoint(wire)
    newPath.Cursor = start
    let mid = new Point(start.x+2,start.y)
    let end = this.getEndPoint(wire)

    newPath = newPath.side(mid).top(end).side(end)
    
    return newPath
  }

  protected pathBack(path : SegmentBuilder, wire : Wire) : SegmentBuilder
  {
    let pathYBackwards = wire.incoming.position.y<=wire.outgoing.position.y
    let newPath = path
    let start = this.getStartingPoint(wire)
    let gap = new Point(start.x+2,start.y)
    newPath.Cursor = start

    let mid = new Point(start.x, this.getYMiddlePoint(wire))
    let secondGap = this.getEndPoint(wire)
    secondGap = new Point(secondGap.x-2.5,secondGap.y)
    let end = this.getEndPoint(wire)
    if(pathYBackwards)
    end = new Point(end.x,end.y+5)

    try{
    newPath = newPath.side(gap).top(mid).side(secondGap).top(end)
    }catch(e)
    {
      console.log(e)
    }
    
    return newPath
  }

  protected pathLoop(path : SegmentBuilder, wire : Wire) : SegmentBuilder
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

    try{
    newPath = newPath.side(gap).top(topCell).side(secondGap).top(secondGap)
    }catch(e)
    {
      console.log(e)
    }
    
    return newPath
  }

  public xDistance(wire : Wire)
  {
    return Math.sqrt((wire.incoming.position.x-wire.outgoing.position.x)**2)
  }
  public yDistance(wire : Wire)
  {
    return Math.sqrt((wire.incoming.position.y-wire.outgoing.position.y)**2)
  }

  public buildPath(wire : Wire)
  {
    try{
    let sameY = wire.incoming.position.y == wire.outgoing.position.y
    let xDistance = this.xDistance(wire)
    let pathXBackwards = wire.incoming.position.x>=wire.outgoing.position.x
    let path = new SegmentBuilder(this.cellHeight,this.cellWidth)

    //console.log("x distance "+xDistance)
    if(sameY && pathXBackwards)
    {
      //console.log("sameYBack")
      path = this.pathLoop(path,wire)
    }
    else if(sameY)
    {
      //console.log("sameY")
      path = this.pathStraight(path,wire)
    }
    else if(pathXBackwards)
    {
     // console.log("back")
      path = this.pathBack(path,wire)
    }
    else if(xDistance<=(this.cellWidth/2) && wire.incoming.inputs.length == 2)
    {
      //console.log("up special")
      path = this.pathBack(path,wire)
    }
    else if(xDistance<=(this.cellWidth/2))
    {
      //console.log("up")
      path = this.pathUp(path,wire)
    }
    else
    {
      //console.log("regular")
      path = this.path(path,wire)
    }
    wire.xSegments = path.xSegments
    wire.ySegments = path.ySegments
    //console.log(wire)
    }catch(e)
    {
      console.log(e)
    }
  }


}