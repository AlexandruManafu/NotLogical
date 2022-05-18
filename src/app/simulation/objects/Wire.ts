import { Gate } from "./gates/Gate"
import { Segment } from "./geometry/Segment"

export class Wire{
    private timesPropagated = 0
    public xSegments : Array<Segment> = []
    public ySegments : Array<Segment> = []
    constructor(protected id: string, protected numberCyclesAllowed : number,
                public incoming : Gate, public outgoing : Gate, protected outPosition : number)
    {

    }

    get Id()
    {
        return this.id
    }

    get OutPosition()
    {
        return this.outPosition
    }

    get TimesPropagated()
    {
        return this.timesPropagated
    }

    public resetTimesPropagated()
    {
        this.timesPropagated = 0
    }

    public propagate()
    {
        if(this.timesPropagated < this.numberCyclesAllowed)
        {
            let state = this.incoming.State
            if(state != this.outgoing.inputs[this.outPosition])
            {
                this.outgoing.addInput(state,this.outPosition)
                this.outgoing.simulate()
                this.timesPropagated +=1
            }
        }
        else
        {
            this.outgoing.addInput("u",this.outPosition)
            this.outgoing.simulate()
            this.timesPropagated +=1
        }
    }

    public disconnect()
    {
        this.outgoing.addInput("Z",this.outPosition)
        this.outgoing.simulate()
    }
}