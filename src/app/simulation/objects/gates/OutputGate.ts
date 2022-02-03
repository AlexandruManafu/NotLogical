import { Gate } from "./Gate"

export class OutputGate extends Gate {

    constructor(id : string)
    {
        super(id)
    }

    addInput(input : boolean|string, position : number)
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
            this.state = inputValue
        else if(typeof inputValue == "boolean")
            this.state = inputValue
        else
            throw new Error("Not Implmented "+ this.id)
        console.log(this.state)
    }

}
