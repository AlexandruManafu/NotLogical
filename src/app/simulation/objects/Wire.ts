import { Gate } from "./gates/Gate"

export class Wire{
    constructor(protected id: string, protected incoming : Gate, protected outgoing : Gate, protected outPosition : number)
    {
        this.simulateOnChange()
    }

    get Id()
    {
        return this.id
    }

    private simulateOnChange()
    {
        let state = this.incoming.State
        this.outgoing.addInput(state,this.outPosition)
        this.outgoing.simulate()
    }
}