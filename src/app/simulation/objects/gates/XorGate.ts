import { Gate } from "./Gate"

export class XorGate extends Gate {
    public override outputVisualWireCorrection: number = 1
    constructor(id : string)
    {
        super(id)
        this.inputs = ["u","u"]
    }

    public addInput(input : boolean | string, position : number)
    {
        if(position < 2)
            this.inputs[position] = input
        else
            throw new Error("Invalid position for binary gate "+this.Id)
    }

    public simulate()
    {
        if(this.inputs.includes("u") || this.inputs.includes("Z") )
            this.state = "u"
        else if(this.inputs[0] != this.inputs[1])
            this.state = true
        else if(this.inputs[0] == this.inputs[1])
            this.state = false
        else
            throw new Error("Not Implmented "+ this.id)

    }
 
}