import { Gate } from "./Gate"

export class OrGate extends Gate {
    constructor(id : string)
    {
        super(id)
    }

    public addInput(input : boolean | string, position : number)
    {
        if(this.inputs.length == 0)
        {
            this.inputs = ["u","u"]
        }
        if(position < 2)
            this.inputs[position] = input
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