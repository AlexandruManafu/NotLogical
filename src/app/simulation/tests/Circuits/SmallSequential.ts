import { Circuit } from "../../objects/Circuit";
import { CircuitBuilder } from "../../objects/creational/CircuitBuilder";
import { Simulator } from "../../objects/Simulator";

export class SmallSequential
{
    public norSrLatch()
    {
        let bld = new CircuitBuilder()
        bld = bld.
        gate("input","S").
        gate("input","R")

        bld = bld.
        gate("nor","nor1").
        gate("nor","nor2")

        bld = bld.
        gate("output","Q").
        gate("output","Q'")

        //connect inputs
        bld = bld.
        wire("w1","R","nor1").
        wire("w4","S","nor2",1)

        //outputs
        bld = bld.
        wire("w96","nor1","Q").
        wire("w97","nor2","Q'")

        //loopback
        bld = bld.
        wire("w98","nor1","nor2").
        wire("w99","nor2","nor1",1)


        let circ = new Circuit(bld)
        let sim = new Simulator(circ)

        return sim
    }

    nandSrLatch()
    {
        let bld = new CircuitBuilder()
        bld = bld.
        gate("input","S").
        gate("input","R")
        

        bld = bld.
        gate("nand","nand1").
        gate("nand","nand2")

        bld = bld.
        gate("output","Q").
        gate("output","Q'")

        //connect inputs
        bld = bld.
        wire("w1.1","S","nand1").
        wire("w2.1","R","nand2",1)

        //outputs
        bld = bld.
        wire("w96","nand1","Q").
        wire("w97","nand2","Q'")

        //loopback
        bld = bld.
        wire("w98","nand1","nand2").
        wire("w99","nand2","nand1",1)


        let circ = new Circuit(bld)
        let sim = new Simulator(circ)

        return sim

    }
    
}