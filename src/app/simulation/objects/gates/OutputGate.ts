import { Gate } from "./Gate"

export class OutputGate extends Gate {

    constructor(id : string)
    {
        super(id)
        this.inputs = ["u"]
    }

    addInput(input : boolean|string, position : number)
    {
        this.inputs[0] = input
    }

    public simulate()
    {
        let inputValue = this.inputs[0]!
        if(inputValue == "u" || inputValue == "Z")
            this.state = inputValue
        else if(typeof inputValue == "boolean")
            this.state = inputValue
        else
            throw new Error("Not Implmented "+ this.id)
    }

}
