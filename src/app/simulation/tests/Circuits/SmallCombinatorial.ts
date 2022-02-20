import { Circuit } from "../../objects/Circuit";
import { CircuitBuilder } from "../../objects/creational/CircuitBuilder";
import { Simulator } from "../../objects/Simulator";

export class SmallCombinatorial
{
    public halfAdder()
    {
        let bld = new CircuitBuilder()

        bld = bld.gate("input","A")
        bld = bld.gate("input","B")
        bld = bld.gate("and")
        bld = bld.gate("xor")
        bld = bld.gate("output","sum")
        bld = bld.gate("output","carry")

        bld = bld.wire("wire2.1","A","xor")
        bld = bld.wire("wire2.2","B","xor",1)
        bld = bld.wire("wire2.2.1","xor","sum",1)

        bld = bld.wire("wire1.1","A","and")
        bld = bld.wire("wire1.2","B","and",1)
        bld = bld.wire("wire1.2.1","and","carry",1)

        let circ = new Circuit(bld)
        let sim = new Simulator(circ)

        return sim
    }

    public multiplexer2()
    {
        let bld = new CircuitBuilder()

        bld = bld.gate("input","S0")
        bld = bld.gate("not")

        bld = bld.gate("input","I1")
        bld = bld.gate("input","I2")

        bld = bld.gate("and","and0")
        bld = bld.gate("and","and1")
        bld = bld.gate("or")
        bld = bld.gate("output")

        bld = bld.wire("wire00","S0","and1")
        bld = bld.wire("wire01","S0","not")
        bld = bld.wire("wire011","not","and0")

        bld = bld.wire("wire10","I1","and0",1)
        bld = bld.wire("wire21","I2","and1",1)

        bld = bld.wire("wire30","and0","or")
        bld = bld.wire("wire31","and1","or",1)

        bld = bld.wire("wire41","or","output")

        let circ = new Circuit(bld)
        let sim = new Simulator(circ)

        return sim
    }
    
}