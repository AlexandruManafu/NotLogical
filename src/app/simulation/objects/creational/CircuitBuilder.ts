import { Gate } from "../gates/Gate";
import { InputGate } from "../gates/InputGate";
import { GateSearch } from "../utils/GateSearch";
import { Wire } from "../Wire";
import { GateFactory } from "./GateFactory";

export class CircuitBuilder{
    public gates : Array<Gate | InputGate> = []
    public wires : Array<Wire> = []
    constructor(private numberCyclesAllowed : number = 1){

    }

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
            GateSearch.getIndex(this.gates, gate.Id)
        }catch(e)
        {
            this.gates.push(gate)
            return
        }
        throw new Error("Duplicate id: " + gate.Id)
    }

    public gate(type : string, id : string = type, positionXY? : Array<number>): CircuitBuilder
    {
        let newGate = GateFactory.createGate(type,id)
        if(positionXY!)
            newGate.positionXY = positionXY
        this.addGate(newGate)

        return this;
    }

    private  addWire(id : string, idIncoming : string, idOutgoing : string, outPosition : number) : void
    {
        // If no wire exists and no wire with the same outgoing exists construct and add the new wire
        try{
            GateSearch.getIndex(this.wires,id)
        }catch(e){

            try{
                let incoming = GateSearch.getIndex(this.gates, idIncoming)
                let outgoing = GateSearch.getIndex(this.gates, idOutgoing)

                let wire = new Wire(id, this.numberCyclesAllowed, this.gates[incoming], this.gates[outgoing], outPosition)
                let matchingWires = this.getWiresByOutput(idOutgoing, outPosition)
                if(matchingWires.length == 0)
                {
                    this.wires.push(wire)
                    return
                }
            }catch(e){
                throw e
            }
        }
        throw new Error("Duplicate id, or id and outPosition: " + id)
    }

    public wire(id : string, idIncoming : string, idOutgoing : string, outPosition : number = 0) : CircuitBuilder
    {
        this.addWire(id,idIncoming,idOutgoing,outPosition)

        return this;
    }

    public getGate(id : string)
    {
        try{
        let index = GateSearch.getIndex(this.gates,id)
        return this.gates[index];
        }catch(e)
        {
            throw e
        }
    }


    public getWire(id : string)
    {
        try{
        let index = GateSearch.getIndex(this.wires,id)
        return this.wires[index];
        }catch(e)
        {
            throw e
        }
    }

    public getWiresByOutput(outputId : string, position : number) : Array<Wire>
    {
        let result : Array<Wire> = []
        for(let i = 0;i<this.wires.length;i++)
        {
            let wire = this.wires[i]
            if(wire.outgoing.Id == outputId && wire.OutPosition == position)
                result.push(wire)
        }
        return result
    }

    public getNeighbourWires(gateId : string) : Array<string>
    {
        let result = []
        for(let i = 0;i<this.wires.length;i++)
        {
            let wire = this.wires[i]
            if(wire.outgoing.Id == gateId || wire.incoming.Id == gateId)
                result.push(wire.Id)
        }
        return result
    }

    private removeNeghbourWires(id : string)
    {
        let conncectedWires = this.getNeighbourWires(id)
        for(let i = 0; i<conncectedWires.length;i++)
        {
            this.removeWire(conncectedWires[i]) 
        }
    }

    public removeGate(id : string)
    {
        let targetIndex = GateSearch.getIndex(this.gates,id)
        this.removeNeghbourWires(id)

        this.gates.splice(targetIndex, 1);
    }

    public removeWire(id : string)
    {
        let targetIndex = GateSearch.getIndex(this.wires,id)
        this.wires[targetIndex].disconnect()
        
        this.wires.splice(targetIndex, 1);
    }
}