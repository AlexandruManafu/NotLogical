import { Gate } from "../gates/Gate"
import { InputGate } from "../gates/InputGate"
import { OutputGate } from "../gates/OutputGate"
import { NotGate } from "../gates/NotGate"
import { OrGate } from "../gates/OrGate"
import { AndGate } from "../gates/AndGate"
import { XorGate } from "../gates/XorGate"
import { NorGate } from "../gates/NorGate"

export class GateFactory{
    constructor(){}

    public static createGate(type : string | undefined,id : string) : Gate | InputGate
    {

        switch(type)
        {
            case "input":
                return new InputGate(id)
            case "output":
                return new OutputGate(id)
            case "not":
                return new NotGate(id)
            case "or":
                return new OrGate(id)
            case "and":
                return new AndGate(id)
            case "xor":
                return new XorGate(id)
            case "nor":
                return new NorGate(id)

            default:
                throw new Error("Invalid gate type")
        }
    }

    public static createGateLongNames(longName : string, id : string)
    {
        let map = new Map<string,string>()
        map.set("NotGate","not")
        map.set("InputGate","input")
        map.set("OutputGate","output")
        map.set("AndGate","and")
        map.set("OrGate","or")
        map.set("XorGate","xor")
        map.set("NorGate","nor")

        let short = map.get(longName)
        return this.createGate(short,id)
        

    }

}