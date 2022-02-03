import { Gate } from "./Gate"

export class InputGate extends Gate{
    constructor(id : string)
    {
        super(id)
    }

    public turnOn()
    {
        this.state = true
    }

    public turnOff()
    {
        this.state = false
    }

    public simulate(): void {
        
    }

    public addInput(input: boolean | string, position: number): void {
        
    }

}