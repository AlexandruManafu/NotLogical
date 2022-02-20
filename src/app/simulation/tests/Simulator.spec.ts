import { TestBed } from '@angular/core/testing';
import { Circuit } from '../objects/Circuit';
import { CircuitBuilder } from '../objects/creational/CircuitBuilder';
import { Simulator } from '../objects/Simulator';
import { SmallCombinatorial } from './Circuits/SmallCombinatorial';
import { SmallSequential } from './Circuits/SmallSequential';



describe('Simulator with no cycles with array inputs and outputs', () => {
  
  let combinatorial = new SmallCombinatorial()
  let sequential = new SmallSequential()
  let simulator = new Simulator();

  beforeEach(() =>{
    simulator = new Simulator()
  })

  afterEach(()=>{
    console.log("after")
    console.log(simulator.deepCopy())
    simulator = new Simulator()
  })

  function inExpectsOut(sim : Simulator, inputs : Array<boolean>, outputs : Array<boolean | string>) {
    simulator.simulateVector(inputs)
    expect(simulator.getOutputStatesArray()).toEqual(outputs)
  }

  function inMapExpectsOut(sim : Simulator, inputs : Map<string, boolean|string>, outputs : Map<string, boolean|string>) {
    simulator.simulate(inputs)
    expect(simulator.getOutputStatesMap()).toEqual(outputs)
  }

  it("A half adder with 2 inputs 2 outputs, for each input there is a specific output", () => { 

    simulator = combinatorial.halfAdder();

    inExpectsOut(simulator,[false,false],[false,false])
    inExpectsOut(simulator,[false,true],[true,false])
    inExpectsOut(simulator,[true,false],[true,false])
    inExpectsOut(simulator,[true,true],[false,true])

    console.log("Half adder")
  });

  it("A multiplexer with inputs S0 I1 I2 and 1 output, for each input the output is the selected input", () => { 

    simulator = combinatorial.multiplexer2()

    inExpectsOut(simulator,[false,false,false],[false])
    inExpectsOut(simulator,[true,false,false],[false])

    
    inExpectsOut(simulator,[false,true,false],[true])
    inExpectsOut(simulator,[false,false,true],[false])
    inExpectsOut(simulator,[false,true,true],[true])
         
    inExpectsOut(simulator,[true,true,false],[false])
    inExpectsOut(simulator,[true,false,true],[true])
    inExpectsOut(simulator,[true,true,true],[true])

    console.log("Multiplexer")

  });

  it("A Nor SR-Latch with inputs Set Enable Reset in case all inputs are true the output will be false,false the next state cannot be determined and is u,u", () => { 
    simulator = sequential.norSrLatch()

    //set and reset at the same time state not allowed (race condition) 
    //reason being we do not know which wire is supposed to propagate first
    inExpectsOut(simulator,[true,true,true],[false,false])
    //hold, next value cannot be determined 
    inExpectsOut(simulator,[false,true,false],["u","u"])

    console.log("SR race condition")
  });

  it("A Nor SR-Latch with inputs Set Enable Reset should be able to reset then hold a bit value", () => { 

    simulator = sequential.norSrLatch()
    //reset
    inExpectsOut(simulator,[false,true,true],[false,true])
    //hold
    inExpectsOut(simulator,[false,true,false],[false,true])

    console.log("SR reset")
  });

  it("A Nor SR-Latch with inputs Set Enable Reset should be able to set then hold a bit value", () => { 

    simulator = sequential.norSrLatch()
    //set 
    inExpectsOut(simulator,[true,true,false],[true,false])
    //hold
    inExpectsOut(simulator,[false,true,false],[true,false])


    console.log("SR set")
  });


});