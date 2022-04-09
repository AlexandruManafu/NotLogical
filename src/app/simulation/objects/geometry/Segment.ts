import { Point } from "./Point";

export class Segment
{
    constructor(public start : Point, public end : Point)
    {}

    private getLength(t:number,t1:number)
    {
        if(t>t1)
            return t - t1
        return t1 - t
    }

    get width()
    {
        let x = this.start.x
        let x1 = this.end.x
        return this.getLength(x,x1)
    }

    get height()
    {
        let y = this.start.y
        let y1 = this.end.y
        return this.getLength(y,y1)
    }
}