import { Circuit } from "./Circuit";
import { CircuitEvent } from "./CircuitEvent"
import { Gate } from "./gates/Gate";
import { InputGate } from "./gates/InputGate";
import { Wire } from "./Wire";

export class Simulator {

    eventQue : Array<CircuitEvent> = []
    wireQue : Array<Wire> = []

    constructor(private circuit : Circuit)
    {
    }

    public deepCopy() : Simulator
    {
        return JSON.parse(JSON.stringify(this));
    }

    public setInputs(inputs: Array<boolean | string>)
    {
        let inputGates : Array<InputGate> = this.circuit.getInputs()
        if(inputs.length != inputGates.length)
            throw new Error("Input length mismatch "+ inputs)
        for(let i=0;i<inputs.length;i++)
        {
            let id = inputGates[i].Id
            let oldValue =  inputGates[i].State

            if(oldValue != inputs[i])
            {
                let even = new CircuitEvent(id,inputs[i],"input");
                this.eventQue.push(even)
            }
        }
    }

    public getWiresByInput(inputId : string) : Array<Wire>
    {
        let wires = this.circuit.Wires
        let result : Array<Wire> = []
        for(let i = 0;i<wires.length;i++)
        {
            if(wires[i].inputId == inputId)
                result.push(wires[i])
        }
        return result
    }

    public processEvents()
    {
        let event = this.eventQue.shift()
        while(event != undefined){
            if(event.action == "input")
                this.circuit.setInput(event.componentId,event.newValue)
            
            let fanout : Array<Wire> = this.getWiresByInput(event.componentId)
            for(let i = 0; i<fanout.length;i++)
            {
                if(!this.wireQue.includes(fanout[i]))
                    this.wireQue.push(fanout[i])
            }

 
            event = this.eventQue.shift()
        }
    }

    public processWires()
    {
        let wire = this.wireQue.shift()
        while(wire != undefined){

            console.log("Intermediary \n")
            console.log(this.deepCopy())

            let prevValue = wire.outState
            wire.propagate()
            let newValue = wire.outState
            if(newValue != prevValue)
            {
                let even = new CircuitEvent(wire.outputId,newValue,"propagate");
                this.eventQue.push(even)
            }

            wire = this.wireQue.shift()
        }
    }

    public simulate(inputs: Array<boolean | string>)
    {
        this.setInputs(inputs)
        while(this.eventQue.length != 0)
        {
            this.processEvents()
            if(this.wireQue.length != 0)
                this.processWires()
        }

    }
}