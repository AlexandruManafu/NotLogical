import { Point } from "./Point";
import { Segment } from "./Segment";

export class SegmentBuilder
{
    public xSegments : Array<Segment> = []
    public ySegments : Array<Segment> = []

    private cursor = new Point(0,0)
    constructor(private cellHeight : number, private cellWidth : number)
    {
    }

    set Cursor(c : Point)
    {
      this.cursor = c
    }

    public up(multiplier:number = 1)
    {
      let newY = this.cursor.y + this.cellHeight * multiplier
      let end = new Point(this.cursor.x,newY)
      let ySeg = new Segment(this.cursor,end)
      this.ySegments.push(ySeg)
      this.cursor = end

      return this
    }

    public right(multiplier:number = 1)
    {
      let newX = this.cursor.x + this.cellWidth * multiplier

      let end = new Point(newX,this.cursor.y)
      let xSeg = new Segment(this.cursor,end)
      this.ySegments.push(xSeg)
      this.cursor = end

      return this
    }

    public top(point : Point)
    {
      let sameXPoint = new Point(this.cursor.x, point.y)
      let seg = new Segment(this.cursor,sameXPoint)
      if(this.cursor.y<point.y)
        seg = new Segment(sameXPoint,this.cursor)
      this.cursor = sameXPoint

      return this.segment(seg)
    }

    public side(point : Point)
    {
      let sameYPoint = new Point(point.x,this.cursor.y)
      let seg = new Segment(this.cursor,sameYPoint)
      if(this.cursor.x>point.x)
      {
        seg = new Segment(sameYPoint,this.cursor)
      }
      this.cursor = sameYPoint

      return this.segment(seg)
    }

    public segment(seg : Segment)
    {
      if(seg.end.x == seg.start.x)
      {
        this.ySegments.push(seg)
      }
      else if(seg.end.y == seg.start.y)
      {
        this.xSegments.push(seg)
      }
      else
      {
        let str = JSON.stringify(seg)
        throw new Error("Not a straight segment "+ str)
      }

      return this
    }
}