import { GateFactory } from "../objects/creational/GateFactory";

/* DEPRECATED BUT STILL HOLD
describe('Gates', () => {

  let inputA  = GateFactory.createGate("input","A")
  let not = GateFactory.createGate("not","not")
  let or = GateFactory.createGate("or","or")
  let and = GateFactory.createGate("and","and")
  let out = GateFactory.createGate("output","out")
  
  beforeEach(() =>{
    inputA  = GateFactory.createGate("input","A")
    not = GateFactory.createGate("not","not")
    or = GateFactory.createGate("or","or")
    and = GateFactory.createGate("and","and")
  })
  
  it('Inputs should be toggleable for states true, false, u, Z', () => {
    inputA.addInput(true,0)
    expect(inputA.State).toBeTrue()
    inputA.addInput(false,0)
    expect(inputA.State).toBeFalse()
    inputA.addInput("u",0)
    expect(inputA.State).toBe("u")
    inputA.addInput("Z",0)
    expect(inputA.State).toBe("Z")
    
    expect(() =>{inputA.addInput("a",0)} ).toThrowError()
    
  });

  it('Not Gate should compute the inverse of a boolean or remain u (unknown)', () => {
    not.addInput(true,0)
    not.simulate()
    expect(not.State).toBeFalse()

    not.addInput(false,0)
    not.simulate()
    expect(not.State).toBeTrue()

    not.addInput("Z",0)
    not.simulate()
    expect(not.State).toBe("u")

    not.addInput("a",0)
    expect(() =>{not.simulate()} ).toThrowError()
  });

  it('A unary gate should ignore the position for input', () => {
    not.addInput(true,1000)
    not.simulate()
    expect(not.State).toBeFalse()

    inputA.addInput(true,-1000)
    expect(inputA.State).toBeTrue()
  });

  it('Binary gates can take between 0 and 2 inputs', () => {
    and.addInput(true, 0)
    and.addInput(true, 1)
    or.addInput(true, 0)
    or.addInput(true, 1)

    expect(() =>{and.addInput(true, 2)} ).toThrowError()
    expect(() =>{or.addInput(true, 2)} ).toThrowError()
  });

  it('The or gate has the state true if one input is true', () => {
    or.addInput(true, 0)
    or.addInput(true, 1)
    or.simulate()
    expect(or.State).toBe(true)

    or.addInput(true, 0)
    or.addInput("Z", 1)
    or.simulate()
    expect(or.State).toBe(true)

    or.addInput("u", 0)
    or.addInput(true, 1)
    or.simulate()
    expect(or.State).toBe(true)

    or.addInput(false, 0)
    or.addInput(false, 1)
    or.simulate()
    expect(or.State).toBe(false)
  });

  it('The and gate has the state true if all inputs are true, u if one is u/Z', () => {
    and.addInput(true, 0)
    and.addInput(true, 1)
    and.simulate()
    expect(and.State).toBe(true)

    and.addInput(true, 0)
    and.addInput("Z", 1)
    and.simulate()
    expect(and.State).toBe("u")

    and.addInput("u", 0)
    and.addInput(true, 1)
    and.simulate()
    expect(and.State).toBe("u")

    and.addInput(false, 0)
    and.addInput(false, 1)
    and.simulate()
    expect(and.State).toBe(false)
  });

  it('All gates initially should have their initial state u', () => {
    expect(and.State).toBe("u")
    expect(or.State).toBe("u")
    expect(inputA.State).toBe("u")
    expect(not.State).toBe("u")
    expect(out.State).toBe("u")
  });

  it('All gates initially should have their inputs set to u', () => {
    expect(and.inputs).toEqual(["u","u"])
    expect(or.inputs).toEqual(["u","u"])
    expect(inputA.inputs).toEqual(["u"])
    expect(not.inputs).toEqual(["u"])
    expect(out.inputs).toEqual(["u"])
  });




});
*/