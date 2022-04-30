import { Gate } from "../gates/Gate";
import { InputGate } from "../gates/InputGate";
import { Segment } from "../geometry/Segment";
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

    private  addWire(id : string, idIncoming : string, idOutgoing : string, outPosition : number,
    xSegments: Array<Segment>, ySegments: Array<Segment>) : void
    {
        // If no wire exists and no wire with the same outgoing exists construct and add the new wire
        try{
            GateSearch.getIndex(this.wires,id)
        }catch(e){

            try{
                let incoming = GateSearch.getIndex(this.gates, idIncoming)
                let outgoing = GateSearch.getIndex(this.gates, idOutgoing)

                let wire = new Wire(id, this.numberCyclesAllowed, this.gates[incoming], this.gates[outgoing], outPosition)
                wire.xSegments = xSegments
                wire.ySegments = ySegments
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

    public wire(id : string, idIncoming : string, idOutgoing : string, outPosition : number = 0,
    xSegments : Array<Segment> = [], ySegments : Array<Segment> = []) : CircuitBuilder
    {
        this.addWire(id,idIncoming,idOutgoing,outPosition,xSegments,ySegments)

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

    public getNormalizedCircuit() : any
    {
        let object : any = {}
        let wires = this.wires
        let gates = this.gates
        let normalizedGates = []
        let normalizedWires = []
        for(let i = 0 ; i<gates.length; i++)
        {
            let temp = {
                id: gates[i].Id,
                type: gates[i].constructor.name,
                positionXY: gates[i].positionXY
            }
            normalizedGates.push(temp)
        }
        for(let i = 0 ; i<wires.length; i++)
        {
            let temp = {
            id : wires[i].Id,
            idIncoming : wires[i].incoming.Id,
            idOutgoing : wires[i].outgoing.Id,
            outPosition : wires[i].OutPosition,
            xSegments : wires[i].xSegments,
            ySegments : wires[i].ySegments
            }
            normalizedWires.push(temp)
        }
        object.numberCyclesAllowed = this.numberCyclesAllowed,
        object.gates = normalizedGates
        object.wires = normalizedWires
        return object;
    }

    public static constructFromNormalized(object : any) : CircuitBuilder
    {
        let builder = new CircuitBuilder(object.numberCyclesAllowed);
        let gates = object.gates
        let wires  = object.wires

        for(let i=0;i<gates.length;i++)
        {
            builder = builder.gate(gates[i].type, gates[i].id, gates[i].positionXY)
        }

        for(let i=0;i<wires.length;i++)
        {
            builder = builder.wire(wires[i].id, wires[i].idIncoming,
            wires[i].idOutgoing, wires[i].outPosition, wires[i].xSegments, wires[i].ySegments)
        }

        return builder
    }
}