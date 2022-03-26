import { Circuit } from "./Circuit";
import { CircuitEvent } from "./CircuitEvent"
import { InputGate } from "./gates/InputGate";
import { GateSearch } from "./utils/GateSearch";
import { Wire } from "./Wire";

export class Simulator {
    eventQue : Array<CircuitEvent> = []
    wireQue : Array<Wire> = []
    visitedWires : Array<Wire> = []

    constructor(public circuit : Circuit | undefined = undefined)
    {
    }

    public deepCopy() : Simulator
    {
        return JSON.parse(JSON.stringify(this));
    }

    public addInputEvent(id:string,value:string|boolean)
    {
        let even = new CircuitEvent(id,value,"input");
        this.eventQue.push(even)
    }

    public setInputsVector(inputs: Array<boolean | string>)
    {
        let inputGates : Array<InputGate> = this.circuit!.getInputs()
        if(inputs.length != inputGates.length)
            throw new Error("Input length mismatch "+ inputs)
        for(let i=0;i<inputs.length;i++)
        {
            let id = inputGates[i].Id
            let oldValue =  inputGates[i].State

            if(oldValue != inputs[i])
                this.addInputEvent(id,inputs[i])
        }
    }

    public setInputsMap(inputs: Map<string,boolean | string>)
    {
        inputs.forEach((value: boolean | string, key: string) => {
            let targetInput = this.circuit!.getInput(key)
            if(targetInput!)
            {
                let oldValue =  targetInput.State
                let newValue = value

                if(oldValue != newValue)
                    this.addInputEvent(targetInput.Id,newValue)
            }
        });
    }

    public processEvents()
    {
        let event = this.eventQue.shift()
        while(event != undefined){
            if(event.action == "input")
                this.circuit!.setInput(event.componentId,event.newValue)
            
            let fanout = GateSearch.getWiresByIO(this.circuit!.Wires,event.componentId,false)
            for(let i = 0; i<fanout.length;i++)
            {
                if(!this.wireQue.includes(fanout[i]))
                {
                    this.wireQue.push(fanout[i])
                    this.visitedWires.push(fanout[i])
                }
            }

 
            event = this.eventQue.shift()
        }
    }

    public processWires()
    {
        let wire = this.wireQue.shift()
        while(wire != undefined){

            //console.log("Intermediary")
            //console.log(this.deepCopy())

            let prevValue = wire.outgoing.State
            wire.propagate()
            let newValue = wire.outgoing.State
            if(newValue != prevValue)
            {
                let even = new CircuitEvent(wire.outgoing.Id,newValue,"");
                this.eventQue.push(even)
            }

            wire = this.wireQue.shift()
        }
    }

    startSimulation()
    {
        while(this.eventQue.length != 0)
        {
            this.processEvents()
            if(this.wireQue.length != 0)
                this.processWires()
        }
    }

    protected resetVisitedWires()
    {
        while(this.visitedWires.length != 0)
        {
            let target = this.visitedWires.shift()
            target!.resetTimesPropagated()
        }
    }

    public simulateVector(inputs: Array<boolean | string>)
    {
        this.setInputsVector(inputs)
        this.startSimulation()
        this.resetVisitedWires()
    }

    public simulate(inputs?: Map<string,boolean | string>)
    {
        if(inputs!)
            this.setInputsMap(inputs)
        this.startSimulation()
        this.resetVisitedWires()
    }

    public reset()
    {
        this.resetVisitedWires()
        this.wireQue = []
        this.eventQue = []
    }

    public getOutputStatesArray() : Array<boolean | string>
    {
        let outputs = this.circuit!.getOutputs()
        let result = []
        for(let i = 0;i<outputs.length;i++)
        {
            result.push(outputs[i].State)
        }
        return result
    }

    public getOutputStatesMap() : Map<string,boolean | string>
    {
        let outputs = this.circuit!.getOutputs()
        let result = new Map<string,boolean | string>()
        for(let i = 0;i<outputs.length;i++)
        {
            result.set(outputs[i].Id,outputs[i].State)
        }
        return result
    }
}