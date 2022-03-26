import { Gate } from "./Gate"

export class NandGate extends Gate {
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

    private allInputsTrue() : boolean
    {
        for(let i = 0;i<this.inputs.length;i++)
        {
            if(this.inputs[i] != true)
                return false
        }
        return true
    }

    public simulate()
    {
        if(this.inputs.includes(false))
            this.state = true
        else if(this.inputs.includes("u") || this.inputs.includes("Z") )
            this.state = "u"
        else if(this.allInputsTrue())
            this.state = false
        else
            throw new Error("Not Implmented "+ this.id)

    }
 
}