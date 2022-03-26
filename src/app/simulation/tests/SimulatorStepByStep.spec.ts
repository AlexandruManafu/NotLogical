import { TestBed } from '@angular/core/testing';
import { Circuit } from '../objects/Circuit';
import { CircuitBuilder } from '../objects/creational/CircuitBuilder';
import { Simulator } from '../objects/Simulator';
import { SimulatorStepByStep } from '../objects/SimulatorStepByStep';
import { SmallCombinatorial } from './Circuits/SmallCombinatorial';
import { SmallSequential } from './Circuits/SmallSequential';



describe('Simulator that propagates one level per simulation with no cycles', () => {
  
  let combinatorial = new SmallCombinatorial()
  let sequential = new SmallSequential()
  let simulator = new SimulatorStepByStep()

  beforeEach(() =>{
    simulator.reset()
  })

  afterEach(()=>{
    console.log("after")
    console.log(simulator.deepCopy())
  })

  function inExpectsOut(numberSteps : number, inputs : Array<boolean>, 
                        outputs : Array<boolean | string>, dontReset? : boolean) {
                          
    simulator.simulateVector(inputs)
    for(let i = 0;i<numberSteps;i++)
    {
      simulator.simulate()
    }
    expect(simulator.getOutputStatesArray()).toEqual(outputs)
    if(dontReset == undefined)
      simulator.reset()
  }

  function inMapExpectsOut(numberSteps : number, inputs : Map<string, boolean|string>, outputs : Map<string, boolean|string>) {
    simulator.simulate(inputs)
    for(let i = 0;i<numberSteps;i++)
    {
      simulator.simulate()
    }
    expect(simulator.getOutputStatesMap()).toEqual(outputs)
  }

  it("A half adder with 2 inputs 2 outputs, it takes exaclty 3 steps to complete", () => { 

    simulator.circuit = combinatorial.halfAdder().circuit;

    inExpectsOut(1,[false,false],[false,false])
    inExpectsOut(1,[false,true],[true,false])
    inExpectsOut(1,[true,false],[true,false])
    inExpectsOut(1,[true,true],[false,true])

    console.log("Half adder")
  });

  it("A multiplexer with inputs S0 I1 I2 and 1 output, it takes exactly 4 steps to complete", () => { 

    simulator.circuit = combinatorial.multiplexer2().circuit

    inExpectsOut(3,[false,false,false],[false])
    inExpectsOut(3,[true,false,false],[false])

    inExpectsOut(3,[false,true,false],[true])
    inExpectsOut(3,[false,false,true],[false])
    inExpectsOut(3,[false,true,true],[true])
         
    inExpectsOut(3,[true,true,false],[false])
    inExpectsOut(3,[true,false,true],[true])
    inExpectsOut(3,[true,true,true],[true])

    console.log("Multiplexer")

  });

  it("A Nor SR-Latch with inputs Set Reset in case inputs are true true we get a race conditions in 3 + 1 steps", () => { 
    simulator.circuit = sequential.norSrLatch().circuit

    //set and reset at the same time state not allowed (race condition) 
    //reason being we do not know which wire is supposed to propagate first
    inExpectsOut(3,[true,true],[false,false],true)
    //hold, next value cannot be determined 
    inExpectsOut(3,[false,false],["u","u"])

    console.log("SR race condition")
  });

  it("A Nor SR-Latch with inputs Set Reset Reseting takes 3 steps", () => { 

    simulator.circuit = sequential.norSrLatch().circuit
    //reset
    inExpectsOut(2,[false,true],[false,true],true)
    //hold
    inExpectsOut(2,[false,false],[false,true])

    console.log("SR reset")
  });

  it("A Nor SR-Latch with inputs Set Reset Setting takes 3 steps", () => { 

    simulator.circuit = sequential.norSrLatch().circuit
    //set 
    inExpectsOut(2,[true,false],[true,false],true)
    //hold
    inExpectsOut(2,[false,false],[true,false])


    console.log("SR set")
  });

  it("A Nand SR-Latch with inputs Set Reset takes exactly 3 steps to complete", () => { 

    simulator.circuit = sequential.nandSrLatch().circuit
    //set 
    inExpectsOut(2,[true,false],[false,true],true)
    //hold (true,true)
    inExpectsOut(2,[true,true],[false,true])


    console.log("Nand SR set")
  });

  it("A Nand SR-Latch with inputs Set Reset If inputs are false false a race condition is reached in 3 + 1 steps", () => { 

    simulator.circuit = sequential.nandSrLatch().circuit
    //set 
    inExpectsOut(3,[false,false],[true,true],true)
    //hold (true,true)
    inExpectsOut(3,[true,true],["u","u"])


    console.log("Nand SR set")
  });




});