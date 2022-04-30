import { TestBed } from '@angular/core/testing';
import { TestTable } from '../objects/TestTable';
import { TruthTable } from '../objects/TruthTable';
import { SmallCombinatorial } from './Circuits/SmallCombinatorial';

describe('TestTable', () => {

  let combinatorial = new SmallCombinatorial()
  let truth = new TestTable(["A"],["B"])

  beforeEach(() =>{
    truth = new TestTable(["A"],["B"])

  })

  afterEach(()=>{
    console.log(truth)
  })

  function expectCombinationOut(combination : Array<boolean | string>,output : string | boolean)
  {
    //expect(truth.getOutput(combination)).toEqual(output)
  }

  it("By default a test table with n inputs should contain 2^n combinations", () => { 
      truth = new TestTable(["A","B"],["C","D"])
      expect(truth.numberCombinations).toEqual(4)
      expect(truth.numberInputs).toEqual(2)
      expect(truth.numberOutputs).toEqual(2)

      truth = new TestTable(["A","B","C"],["D","E","F"])
      expect(truth.numberCombinations).toEqual(8)
      expect(truth.numberInputs).toEqual(3)
      expect(truth.numberOutputs).toEqual(3)

      truth = new TestTable(["A","B","C","D"],["E"])
      expect(truth.numberInputs).toEqual(4)
      expect(truth.numberOutputs).toEqual(1)
      expect(truth.numberCombinations).toEqual(16)
      

      console.log("Test table number combinations")
  });

  it("A test table can be reset, in that case it will have no rows but it will retain inputs,outputs", () => { 

    truth = new TestTable(["A","B","C","D"],["E"])
    truth.deleteAllRows()
    console.log(truth)
    expect(truth.numberInputs).toEqual(4)
    expect(truth.numberOutputs).toEqual(1)
    expect(truth.numberCombinations).toEqual(0)
    
    console.log("Test table reset")
});

it("New rows may be added, the new rows must have the same number of inputs and outputs as the test table ", () => { 

  truth = new TestTable(["A","B","C","D"],["E"])
  truth.deleteAllRows()
  expect(truth.addRow(["u","u","u","u"],["u"])).toBeTruthy()
  expect(() =>{
    truth.addRow([true],[true])
  }).toThrowError()
  expect(() =>{
    truth.addRow([true,true,true,true],[true,true])
  }).toThrowError()

  expect(truth.numberCombinations).toEqual(1)

  console.log("Test table new rows")
});

it("New rows may be deleted, deletion is based on an index if the index is -1 then the last one is deleted", () => { 

  truth = new TestTable(["A","B","C","D"],["E"])
  expect(truth.deleteRow(-1)).toBeTruthy()

  expect(truth.deleteRow(0)).toBeTruthy()

  expect(() =>{
    truth.deleteRow(17)
  }).toThrowError()

  expect(truth.numberCombinations).toEqual(14)

  console.log("Test table delete rows")
});

});
