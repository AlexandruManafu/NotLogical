import { Gate } from "./gates/Gate"

export class Wire{
    private timesPropagated = 0
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

    public resetTimesPropagated()
    {
        this.timesPropagated = 0
    }

    public propagate()
    {
        if(this.timesPropagated < this.numberCyclesAllowed)
        {
            let state = this.incoming.State
            this.outgoing.addInput(state,this.outPosition)
            this.outgoing.simulate()
        }
        else
        {
            this.outgoing.addInput("u",this.outPosition)
            this.outgoing.simulate()
        }
        this.timesPropagated +=1
    }

    public disconnect()
    {
        this.outgoing.addInput("Z",this.outPosition)
    }
}