import { Gate } from "./Gate"

export class InputGate extends Gate{
    constructor(id : string)
    {
        super(id)
        this.inputs = ["u"]
    }

    private setState(input : boolean | string)
    {
        if(typeof input!="boolean" && input != "u" && input != "Z")
            throw new Error("Not implemented "+this.Id)
        this.state = input
    }


    public simulate(): void {
        
    }

    public addInput(input: boolean | string, position: number): void {
        this.inputs[0] = input
        this.setState(input)
    }

}