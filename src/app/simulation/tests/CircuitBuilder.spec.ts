import { TestBed } from '@angular/core/testing';
import { Circuit } from '../objects/Circuit';
import { CircuitBuilder } from '../objects/creational/CircuitBuilder';

/*
describe('CircuitBuilder', () => {
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

  })

  afterEach(()=>{

    circuit = new Circuit(bld)
    console.log(circuit)

  })

  it('For Unary Gates you should not be able to add wires to the same slot on the same outgoing gate', () => {
    
    bld = bld.wire("wire","A","output")
    expect(()=>{
      bld = bld.wire("wire","A","output")
    }).toThrowError()
  });

  it('For Binary Gates you should not be able to add wires to the same slot on the same outgoing gate', () => {
    
    bld = bld.wire("wire","A","or");
    bld = bld.wire("wire2","B","or",1);
    expect(()=>{
      bld = bld.wire("wire3","C","or",1)
    }).toThrowError()
  });

  it('Added gates should have unique ids', () => {
    bld = bld.gate("output","out1")

    expect(()=>{bld = bld.gate("output","out1")}).toThrowError()
  });  

  it('Added wires should have unique ids', () => {
    
    bld = bld.wire("wire","A","or")

    expect(()=>{bld = bld.wire("wire","A","or",1)}).toThrowError()    
  }); 

  it('Removing a gate will remove its neighbour wires, setting Zs apropriatly', () => {
    bld = bld.wire("wire","A","or")
    bld = bld.wire("wire1","B","or",1)
    bld = bld.wire("wire2","or","output")

    let out = bld.getGate("output")
    bld.removeGate("or")

    expect(bld.Wires).toEqual([])  
    expect(out.inputs).toEqual(["Z"])
  });

  it('Removing a wire will make the outgoing component have its corresponsing input set to Z', () => {

    bld = bld.wire("wire","A","or")
    let wire = bld.getWire("wire")
    let outId = wire.outputId;
    let gate = bld.getGate(outId)

    bld.removeWire("wire")

    expect(gate.inputs).toEqual(["Z","u"])


  });
});
*/