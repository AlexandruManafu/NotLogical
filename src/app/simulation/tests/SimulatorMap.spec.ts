import { Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Circuit } from '../objects/Circuit';
import { CircuitBuilder } from '../objects/creational/CircuitBuilder';
import { Simulator } from '../objects/Simulator';
import { SmallCombinatorial } from './Circuits/SmallCombinatorial';
import { SmallSequential } from './Circuits/SmallSequential';



describe('Simulator with no cycles with Map inputs and outputs', () => {
  
  let combinatorial = new SmallCombinatorial()
  let sequential = new SmallSequential()
  let simulator = new Simulator();

  let input = new Map<string, boolean|string>()
  let output = new Map<string, boolean|string>()

  beforeEach(() =>{
    simulator = new Simulator()
    input = new Map<string, boolean|string>()
    output = new Map<string, boolean|string>()
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

  it("A half adder with 2 inputs 2 outputs, propagating one input at the time should yield the same result", () => { 

    simulator = combinatorial.halfAdder();
    input.set("A",false)
    output.set("sum","u")
    output.set("carry",false)
    inMapExpectsOut(simulator,input,output)

    input.set("B",false)
    output.set("sum",false)
    output.set("carry",false)
    inMapExpectsOut(simulator,input,output)

    input.set("A","u")
    input.set("B","u")
    simulator.simulate(input)

    input.set("A",true)
    output.set("sum","u")
    output.set("carry","u")
    inMapExpectsOut(simulator,input,output)
    input.set("B",true)
    output.set("sum",false)
    output.set("carry",true)
    inMapExpectsOut(simulator,input,output)

    console.log("Half adder Map input, simulations executed one after another")
  });

  it("A Nor SR-Latch with inputs executed one after another S = T, R = T gives false, false the next state cannot be determined and is u,u", () => { 
    simulator = sequential.norSrLatch()

    //Set and Reset = T, race condition
    output.set("Q","u")
    output.set("Q'","u")
    inMapExpectsOut(simulator,input,output)

    input.set("S",true)
    output.set("Q","u")
    output.set("Q'",false)
    inMapExpectsOut(simulator,input,output)

    input.set("R",true)
    output.set("Q",false)
    output.set("Q'",false)
    inMapExpectsOut(simulator,input,output)

    //Hold, next value cannot be determined 
    input.set("R",false)
    input.set("S",false)
 
    output.set("Q","u")
    output.set("Q'","u")
    inMapExpectsOut(simulator,input,output)
    
    console.log("SR race condition with simulations executed one after another")
  });



});