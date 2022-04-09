import { Gate } from "./Gate"

export class OrGate extends Gate {
    public override inputVisualWireCorrection = 4
    public override outputVisualWireCorrection = -3
    numberInputs = 2
    constructor(id : string)
    {
        super(id)
        this.inputs = ["u","u"]
    }

    public addInput(input : boolean | string, position : number)
    {
        if(position < this.numberInputs)
            this.inputs[position] = input
        else if(position == this.numberInputs + 1)
            this.inputs.push(input)
        else
            throw new Error("Invalid position for binary gate "+this.Id)
    }

    public simulate()
    {
        if(this.inputs.includes(true))
            this.state = true
        else if(this.inputs.includes("u") || this.inputs.includes("Z") )
            this.state = "u"
        else if(!this.inputs.includes(true))
            this.state = false
        else
            throw new Error("Not Implmented "+ this.id)

    }
 
}