import { Circuit } from "../../objects/Circuit";
import { CircuitBuilder } from "../../objects/creational/CircuitBuilder";
import { Simulator } from "../../objects/Simulator";

export class SmallSequential
{
    public norSrLatch()
    {
        let bld = new CircuitBuilder()
        bld = bld.gate("input","S")
        bld = bld.gate("input","E")
        bld = bld.gate("input","R")
        

        bld = bld.gate("and","and1")
        bld = bld.gate("and","and2")

        bld = bld.gate("nor","nor1")
        bld = bld.gate("nor","nor2")

        bld = bld.gate("output","Q")
        bld = bld.gate("output","Q'")

        //connect inputs
        bld = bld.wire("w1","R","and1")
        bld = bld.wire("w2","E","and1",1)
        bld = bld.wire("w3","E","and2")
        bld = bld.wire("w4","S","and2",1)

        //connect ands to nors
        bld = bld.wire("w1.1","and1","nor1")
        bld = bld.wire("w2.1","and2","nor2",1)

        //outputs
        bld = bld.wire("w96","nor1","Q")
        bld = bld.wire("w97","nor2","Q'")

        //loopback
        bld = bld.wire("w98","Q","nor2")
        bld = bld.wire("w99","Q'","nor1",1)


        let circ = new Circuit(bld)
        let sim = new Simulator(circ)

        return sim
    }
    
}