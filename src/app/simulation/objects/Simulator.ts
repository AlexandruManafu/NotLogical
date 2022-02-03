import { Circuit } from "./Circuit";
import { CircuitEvent } from "./CircuitEvent"

export class Simulator {

    events : Array<CircuitEvent> = []

    constructor(private circuit : Circuit)
    {
    }

    public setInputs(inputs: Array<boolean | string>)
    {
        for(let i=0;i<inputs.length;i++)
        {
            let nthGate = this.circuit.getNthInput(i)
            if(nthGate === undefined)
                throw new Error("Input length mismatch "+ inputs)
            let id = nthGate.Id
            let oldValue =  nthGate.State

            if(oldValue != inputs[i])
            {
                let even = new CircuitEvent(id,inputs[i],"input");
                this.events.push(even)
            }
        }
        
    }
}