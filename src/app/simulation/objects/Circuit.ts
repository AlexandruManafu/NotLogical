import { Wire } from "./Wire"
import { Gate } from "./gates/Gate"
import { InputGate } from "./gates/InputGate"
import { CircuitBuilder } from "./creational/CircuitBuilder"

export class Circuit {

    constructor(builder : CircuitBuilder)
    {
        this.gates = builder.Gates
        this.wires = builder.Wires
    }
    //private inputs : Array<InputGate> = []
    private gates : Array<Gate | InputGate> = []
    private wires : Array<Wire> = []

    private getGate(id : string) : Gate | InputGate
    {
        for(let i = 0;i<this.gates.length;i++)
        {
            if(this.gates[i].Id == id)
                return this.gates[i]
        }
        throw new Error("No Gate found for id: " + id)
    }

    get Wires()
    {
        return this.wires
    }

    get Gates()
    {
        return this.gates
    }

    public setInput(inputGateId : string, value : boolean | string){
        let input = this.getGate(inputGateId)
        if(!(input instanceof InputGate))
            throw new Error("Gate " + input.Id + " not an input")

        input.addInput(value,0)
    }

    public getInputs()
    {
        let result : Array<InputGate> = []
        for(let i = 0;i<this.gates.length ; i++)
        {
            let gate = this.gates[i]
            if(gate instanceof InputGate )
                result.push(gate)
        } 
        return result
    }
}