import { Gate } from "./Gate"

export class NotGate extends Gate {
    constructor(id : string)
    {
        super(id)
    }

    public addInput(input : boolean, position : number)
    {
        if(this.inputs.length == 0)
            this.inputs.push(input)
        else
            this.inputs[0] = input
    }

    public simulate()
    {
        let inputValue = this.inputs[0]!
        if(inputValue == "u" || inputValue == "Z")
            this.state = "u"
        else if(typeof inputValue == "boolean")
            this.state = !inputValue
        else
            throw new Error("Not Implmented "+ this.id)

    }

}