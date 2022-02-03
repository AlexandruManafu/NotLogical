import { Wire } from "./Wire"
import { Gate } from "./gates/Gate"
import { InputGate } from "./gates/InputGate"

export class Circuit {

    constructor()
    {
    }
    //private inputs : Array<InputGate> = []
    private gates : Array<Gate | InputGate> = []
    private wires : Array<Wire> = []

    public addGate(gate : Gate | InputGate)
    {
        this.gates.push(gate)
    }

    public addWire(id : string, idIncoming : string, idOutgoing : string, outPosition : number)
    {
        try{
            let wire = new Wire(id,this.getGate(idIncoming),this.getGate(idOutgoing), outPosition)
            this.wires.push(wire)
        }catch(e){
            console.log(e)
        }
    }

    private getGate(id : string) : Gate | InputGate
    {
        for(let i = 0;i<this.gates.length;i++)
        {
            if(this.gates[i].Id == id)
                return this.gates[i]
        }
        throw new Error("No Gate found for id: " + id)
    }

    private removeElement(arr : any, id : string)
    {
        let result : Array<any> = []
        for(let i = 0;i<arr.length;i++)
        {
            if(arr[i].Id != id)
                result.push(arr[i])

        }
        
        return result
    }

    public removeGate(id : string)
    {
        this.gates = this.removeElement(this.gates,id)
    }

    public removeWire(id : string)
    {
        this.wires = this.removeElement(this.wires,id)
    }

    public turnAllOn()
    {
        for(let i = 0;i<this.gates.length;i++)
        {
            let input = this.gates[i]
            if(input instanceof InputGate)
                input.turnOn()
        }
    }

    public setInput(inputGateId : string, value : boolean){
        try{
            let input = this.getGate(inputGateId)
            if(!(input instanceof InputGate))
                throw new Error("Gate " + input.Id + " not an input")

            if(value)
                input.turnOn()
            else
                input.turnOff()

        }catch(e){
            console.log(e)
        }
    }

    public getNthInput(n : number): InputGate | undefined
    {
        let count = n
        for(let i = 0;i<this.gates.length ; i++)
        {
            let gate = this.gates[i]
            if(gate instanceof InputGate && count == 0)
                return gate
            else if(gate instanceof InputGate)
                count = count - 1
        }
        return undefined
    }
}