
import { CircuitEvent } from "./CircuitEvent"
import { Simulator } from "./Simulator";

export class SimulatorStepByStep extends Simulator {

    stepNumber = 0;
    eventsNextStep : Array<CircuitEvent> = []

    override simulateVector(inputs: Array<boolean | string>)
    {
        this.setInputsVector(inputs)
        this.startSimulation()
    }

    override simulate(inputs?: Map<string,boolean | string>)
    {
        if(inputs!)
            this.setInputsMap(inputs)
        this.startSimulation()
    }
    
    override startSimulation()
    {
        if(this.eventQue.length != 0)
        {
            this.processEvents()
            if(this.wireQue.length != 0)
                this.processWires()
        }
        this.eventQue=this.eventsNextStep
        this.stepNumber++
    }

    override processWires()
    {
        let wire = this.wireQue.shift()
        while(wire != undefined){

            console.log("Intermediary")
            console.log(this.deepCopy())

            let prevValue = wire.outgoing.State
            wire.propagate()
            let newValue = wire.outgoing.State
            if(newValue != prevValue)
            {
                let even = new CircuitEvent(wire.outgoing.Id,newValue,"");
                this.eventsNextStep.push(even)
            }

            wire = this.wireQue.shift()
        }
    }

    override reset()
    {
        this.resetVisitedWires()
        this.wireQue = []
        this.eventQue = []
        this.eventsNextStep = []
        this.stepNumber = 0
    }
}