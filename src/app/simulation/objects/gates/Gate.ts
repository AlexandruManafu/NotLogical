import { InputGate } from "./InputGate"

export abstract class Gate {
    protected state : boolean | string = "u"
    public positionXY : Array<number> = []
    public inputs : Array<boolean | string> = []

    constructor(protected id : string){}

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
    }
}