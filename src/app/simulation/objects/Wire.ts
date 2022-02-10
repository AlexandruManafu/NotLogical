import { Gate } from "./gates/Gate"

export class Wire{
    constructor(protected id: string, protected incoming : Gate, protected outgoing : Gate, protected outPosition : number)
    {

    }

    get Id()
    {
        return this.id
    }

    get inputId()
    {
        return this.incoming.Id
    }

    get outputId()
    {
        return this.outgoing.Id
    }

    get outState()
    {
        return this.outgoing.State
    }

    get incomingInput()
    {
        return this.incoming.inputs
    }

    get OutPosition()
    {
        return this.outPosition
    }

    public propagate()
    {
        let state = this.incoming.State
        this.outgoing.addInput(state,this.outPosition)
        this.outgoing.simulate()
    }

    public remove()
    {
        this.outgoing.addInput("Z",this.outPosition)
    }
}