import { TestBed } from '@angular/core/testing';
import { Circuit } from '../objects/Circuit';
import { CircuitBuilder } from '../objects/creational/CircuitBuilder';
import { SmallCombinatorial } from './Circuits/SmallCombinatorial';
import { SmallSequential } from './Circuits/SmallSequential';

/*
describe('Circuit', () => {
  let combinatorial = new SmallCombinatorial()
  let sequential = new SmallSequential()

  let bld = new CircuitBuilder()
  bld = bld.gate("input","A")
  bld = bld.gate("input","B")
  bld = bld.gate("or")
  bld = bld.gate("and")
  bld = bld.gate("not")
  bld = bld.gate("output")

  let circuit = new Circuit(bld)

  beforeEach(() =>{
    bld = new CircuitBuilder()
    bld = bld.gate("input","A")
    bld = bld.gate("input","B")
    bld = bld.gate("or")
    bld = bld.gate("and")
    bld = bld.gate("not")
    bld = bld.gate("output")
    circuit = new Circuit(bld)

  })

  afterEach(()=>{

    circuit = new Circuit(bld)
    console.log(circuit)

  })

  it("A circuit shouldn't be able to set inputs to anything other than input gates", () => { 
    expect(() => {
        circuit.setInput("or",true)
      }).toThrowError()
  });

  it("An input needs to exists in order to be set", () => { 
    expect(() => {
      circuit.setInput("C",true)
    }).toThrowError()
  });

  it("If an input is set the state of the input gate will equal the input", () => { 
    circuit.setInput("A",false)
    circuit.setInput("B","Z")

    let A = circuit.getInput("A")
    let B = circuit.getInput("B")

    expect(A.State).toEqual(false)
    expect(B.State).toEqual("Z")
  });

  it("It should be possible to get all inputs and outputs as well as individual ones", () => { 
    let inputs = circuit.getInputs()
    let outputs = circuit.getOutputs()

    let A = circuit.getInput("A")
    let out = circuit.getOutput("output")

    expect(inputs.length).toEqual(2)
    expect(outputs.length).toEqual(1)
    expect(A).toBeDefined()
    expect(out).toBeDefined()
  });

  it("It should be possible to get all inputs that will propagate to an output", () => { 
    bld = bld.wire("w1","A","or")
    bld = bld.wire("w2","B","or",1)
    bld = bld.wire("w3","or","output")
    let inputs = circuit.getInputsForOutput("output")

    expect(inputs.length).toEqual(2)
    expect(inputs[0].Id).toEqual("A")
    expect(inputs[1].Id).toEqual("B")
  });

  it("The inputs that propagate to either outputs of a Half Adder are the same", () => { 
    let circuit = combinatorial.halfAdder().circuit

    let inputsSum = circuit!.getInputsForOutput("sum")
    let inputsCarry = circuit!.getInputsForOutput("carry")

    expect(inputsSum.length).toEqual(2)
    expect(inputsSum[0].Id).toEqual("A")
    expect(inputsSum[1].Id).toEqual("B")

    expect(inputsCarry.length).toEqual(2)
    expect(inputsCarry[0].Id).toEqual("A")
    expect(inputsCarry[1].Id).toEqual("B")
  });

  it("The inputs that propagate to the outputs of a SR-Latch are : R,E -> Q ; S,E->!Q", () => { 
    let circuit = sequential.norSrLatch().circuit
  
    let inputsQ = circuit!.getInputsForOutput("Q")
    let inputsNotQ = circuit!.getInputsForOutput("Q'")

    console.log(inputsQ)

    expect(inputsQ.length).toEqual(2)
    expect(inputsQ[0].Id).toEqual("R")
    expect(inputsQ[1].Id).toEqual("E")

    expect(inputsNotQ.length).toEqual(2)
    expect(inputsNotQ[0].Id).toEqual("E")
    expect(inputsNotQ[1].Id).toEqual("S")
  });


});
*/
