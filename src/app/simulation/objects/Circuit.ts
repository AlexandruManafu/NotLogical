import { Wire } from "./Wire"
import { Gate } from "./gates/Gate"
import { InputGate } from "./gates/InputGate"
import { CircuitBuilder } from "./creational/CircuitBuilder"
import { OutputGate } from "./gates/OutputGate"
import { GateSearch } from "./utils/GateSearch"
import { ArrayUtils } from "./utils/ArrayUtils"

export class Circuit {

    constructor(builder : CircuitBuilder)
    {
        this.gates = builder.Gates
        this.wires = builder.Wires
    }
    //private inputs : Array<InputGate> = []
    private gates : Array<Gate | InputGate> = []
    private wires : Array<Wire> = []

    get Wires()
    {
        return this.wires
    }

    get Gates()
    {
        return this.gates
    }

    public setInput(id : string, value : boolean | string):void
    {
        let input = this.getInput(id)
        input.addInput(value,0)
    }

    public getInputs() : Array<InputGate>
    {
        return GateSearch.getGatesbyType(this.Gates,InputGate)
    }

    public getInput(id : string) : InputGate
    {
        let inputs = this.getInputs()
        return GateSearch.getGateById(inputs,id)
        
    }

    public getOutputs() : Array<OutputGate>
    {
        return GateSearch.getGatesbyType(this.Gates,OutputGate)
    }

    public getOutput(id : string) : OutputGate
    {
        let outputs = this.getOutputs()
        return GateSearch.getGateById(outputs,id)
    }

    //given an output O get all inputs that would propagate to O
    public getInputsForOutput(id : string) : Array<InputGate>
    {
        try{
        GateSearch.getGateById(this.gates,id)
        }catch(e)
        {
            throw e
        }

        let result : Array<InputGate> = []
        let conncectedWires = GateSearch.getWiresByIO(this.wires,id,true)
        while(conncectedWires.length > 0)
        {
            let wire = conncectedWires.shift()
            let wireInput = wire!.incoming
            if(!(wireInput instanceof OutputGate))
            {
                let nextWires = GateSearch.getWiresByIO(this.wires,wireInput.Id,true)
                conncectedWires.push(...nextWires)
            }
            if(wireInput instanceof InputGate)
                result.push(wireInput)
        }
        return result

    }

    getNextVector(currentNumber : number, toAdd : number) : {vector: Array<boolean|string>,sum: number}
    {
        let numberInputs = this.getInputs().length
        let result = []
        let vecLength = numberInputs
 
        let number = currentNumber + toAdd

        if(currentNumber == -1 || number > ArrayUtils.getMaximumNumberBinary(vecLength))
        {
            console.log("first")
            for(let i=0; i<vecLength; i++)
            {
                result.push(false)
            }
            number = 0
        }
        else
        {
            if(number<0)
                number = ArrayUtils.getMaximumNumberBinary(vecLength)

            let binString = number.toString(2)
            result = ArrayUtils.binaryStringToArray(binString,vecLength)
        }

        return {vector : result, sum: number}
    }
}