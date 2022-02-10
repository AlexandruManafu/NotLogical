import { TestBed } from '@angular/core/testing';
import { Circuit } from '../objects/Circuit';
import { CircuitBuilder } from '../objects/creational/CircuitBuilder';
import { Simulator } from '../objects/Simulator';



describe('Simulator', () => {
  
  let builder = new CircuitBuilder()
  let circuit = new Circuit(builder)
  let simulator = new Simulator(circuit)
  it('should create', () => {
    expect(simulator).toBeDefined();
  });
});