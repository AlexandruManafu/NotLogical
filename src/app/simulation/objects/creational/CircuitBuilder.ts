import { Gate } from "../gates/Gate";
import { InputGate } from "../gates/InputGate";
import { Wire } from "../Wire";
import { GateFactory } from "./GateFactory";


export class CircuitBuilder{
    private gates : Array<Gate | InputGate> = []
    private wires : Array<Wire> = []
    constructor(){}

    get Gates()
    {
        return this.gates
    }

    get Wires()
    {
        return this.wires
    }

    private addGate(gate : Gate | InputGate) : void
    {
        // If no gate exists add it
        try{
            this.getGate(gate.Id)
        }catch(e)
        {
            this.gates.push(gate)
            return
        }
        throw new Error("Duplicate id: " + gate.Id)
    }

    public gate(type : string, id : string = type) : CircuitBuilder
    {
        let newGate = GateFactory.createGate(type,id)
        this.addGate(newGate)

        return this;
    }

    private  addWire(id : string, idIncoming : string, idOutgoing : string, outPosition : number) : void
    {
        // If no wire exists and no wire with the same outgoing exists construct and add the new wire
        try{
            this.getWire(id)
        }catch(e){
            let wire = new Wire(id, this.getGate(idIncoming), this.getGate(idOutgoing), outPosition)
            let matchingWires = this.getWiresByOutput(idOutgoing, outPosition)
            if(matchingWires.length == 0)
            {
                this.wires.push(wire)
                return
            }
        }
        throw new Error("Duplicate id: " + id)
    }

    public wire(id : string, idIncoming : string, idOutgoing : string, outPosition : number = 0) : CircuitBuilder
    {
        this.addWire(id,idIncoming,idOutgoing,outPosition)

        return this;
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

    private getWire(id : string) : Wire
    {
        for(let i = 0;i<this.wires.length;i++)
        {
            if(this.wires[i].Id == id)
                return this.wires[i]
        }
        throw new Error("No Wire found for id: " + id)
    }

    public getWiresByOutput(outputId : string, position : number) : Array<Wire>
    {
        let result : Array<Wire> = []
        for(let i = 0;i<this.wires.length;i++)
        {
            let wire = this.wires[i]
            if(wire.outputId == outputId && wire.OutPosition == position)
                result.push(wire)
        }
        return result
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
}