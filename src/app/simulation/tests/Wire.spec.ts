import { GateFactory } from "../objects/factory/GateFactory";
import { Wire } from "../objects/Wire";

/*
describe('Gates', () => {

  let inputA  = GateFactory.createGate("input","A")
  let inputB  = GateFactory.createGate("input","B")
  let or = GateFactory.createGate("or","or")
  let out = GateFactory.createGate("output","out")
  
  beforeEach(() =>{
    inputA  = GateFactory.createGate("input","A")
    inputB  = GateFactory.createGate("input","B")
    or = GateFactory.createGate("or","or")
    out = GateFactory.createGate("output","out")
  })

  it('A wire should connect two components, a change in the component is a change in incoming/outgoing objects', () => {
    let wire = new Wire("1", inputA, out,0)
    inputA.addInput(true,0)

    expect(inputA.State).toBeTrue()
    expect(wire.incomingInput).toEqual([true])
    
  });

  it('A wire should only propagate on demand', () => {
    let wire = new Wire("1", inputA, out,0)

    inputA.addInput(true,0)
    expect(out.State).toBe("u")

    wire.propagate()
    expect(out.State).toBe(true)

  });

  it('Propagating A wire should simulate the outgoing gate', () => {
    let wire = new Wire("2", inputA, or ,0)

    inputA.addInput(true,0)
    wire.propagate()
    expect(or.State).toBe(true)

  });

  it('Any number of wires can be attached to a gate (output can have n wires)', () => {
    let wire = new Wire("3", inputA, or, 0)
    let wire2 = new Wire("4", inputA, or, 1)

    inputA.addInput(false,0)

    wire.propagate()
    expect(or.inputs).toEqual([false,"u"])
    expect(or.State).toBe("u")

    wire2.propagate()
    expect(or.inputs).toEqual([false,false])
    expect(or.State).toBe(false)

  });

  it('Removing a wire will set the outgoing input to Z', () => {
    let wire = new Wire("3", inputA, out, 0)
    wire.remove()

    expect(out.inputs).toEqual(["Z"])


  });

});
*/