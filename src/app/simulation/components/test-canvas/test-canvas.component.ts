import { Component, OnInit } from '@angular/core';
import { Circuit } from '../../objects/Circuit';
import { GateFactory } from '../../objects/factory/GateFactory';
import { InputGate } from '../../objects/gates/InputGate';
import { Simulator } from '../../objects/Simulator';

@Component({
  selector: 'app-test-canvas',
  templateUrl: './test-canvas.component.html',
  styleUrls: ['./test-canvas.component.css']
})
export class TestCanvasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.trySimulation()
  }

  trySimulation()
  {
    let circuit = this.createMockCircuit()
    let sim = new Simulator(circuit)

    try{
      /*
      sim.setInputs([true,false])
      sim.processEvents()
      sim.processWires()
      console.log(sim)
      */
     sim.simulate([true,false])
     console.log(sim)
    }catch(e)
    {
      console.log(e)
    }
  }

  createMockCircuit() : Circuit
  {
    let inpu = GateFactory.createGate("input","i1")
    let inpu2 = GateFactory.createGate("input","i2")
    let not = GateFactory.createGate("not","not1")
    let out = GateFactory.createGate("output","out1")
    let or = GateFactory.createGate("or","or1")

    let circ = new Circuit()
    circ.addGate(inpu)
    circ.addGate(inpu2)
    circ.addGate(not)
    circ.addGate(out)
    circ.addGate(or)

    circ.addWire("wire1","i1","or1",0)
    circ.addWire("wire2","i2","or1",1)
    circ.addWire("wire3","or1","not1",0)
    circ.addWire("wire4","not1","out1",0)

    return circ
  }
}
