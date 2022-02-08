import { TestBed } from '@angular/core/testing';
import { Circuit } from '../objects/Circuit';
import { Simulator } from '../objects/Simulator';



describe('Simulator', () => {
  
  let circuit : Circuit = new Circuit()
  let simulator : Simulator = new Simulator(circuit)
  it('should create', () => {
    expect(simulator).toBeDefined();
  });
});