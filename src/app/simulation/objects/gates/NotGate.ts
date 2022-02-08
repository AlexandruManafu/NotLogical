import { Gate } from "./Gate"

export class NotGate extends Gate {
    constructor(id : string)
    {
        super(id)
        this.inputs = ["u"]
    }

    public addInput(input : boolean | string, position : number)
    {  
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