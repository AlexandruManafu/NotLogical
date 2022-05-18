import { Point } from "../geometry/Point"
import { InputGate } from "./InputGate"

export abstract class Gate {
    protected state : boolean | string = "u"
    public position : Point = new Point (0,0)
    public inputs : Array<boolean | string> = []
    public outputVisualWireCorrection = 0
    public inputVisualWireCorrection = 0

    constructor(public id : string){}

    get State()
    {
        return this.state
    }

    get Id()
    {
        return this.id
    }
    public abstract addInput(input : boolean | string, position : number) : void
    public abstract simulate() : void
    public reset()
    {
        this.state = "u"
        if(this.inputs.length==1)
        {
            this.inputs = ["u"]
        }
        else if(this.inputs.length == 2)
        {
            this.inputs = ["u","u"]
        }
    }
}