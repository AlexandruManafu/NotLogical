import { TestBed } from '@angular/core/testing';
import { TestTable } from '../objects/TestTable';
import { SmallCombinatorial } from './Circuits/SmallCombinatorial';
import { SmallSequential } from './Circuits/SmallSequential';

describe('TestTable', () => {

  let combinatorial = new SmallCombinatorial()
  let sequential = new SmallSequential()
  let test = new TestTable(["A"],["B"])

  beforeEach(() =>{
    test = new TestTable(["A"],["B"])

  })

  afterEach(()=>{
    console.log(test)
  })

  it("By default a test table with n inputs should contain 2^n combinations", () => { 
      test = new TestTable(["A","B"],["C","D"])
      expect(test.numberCombinations).toEqual(4)
      expect(test.numberInputs).toEqual(2)
      expect(test.numberOutputs).toEqual(2)

      test = new TestTable(["A","B","C"],["D","E","F"])
      expect(test.numberCombinations).toEqual(8)
      expect(test.numberInputs).toEqual(3)
      expect(test.numberOutputs).toEqual(3)

      test = new TestTable(["A","B","C","D"],["E"])
      expect(test.numberInputs).toEqual(4)
      expect(test.numberOutputs).toEqual(1)
      expect(test.numberCombinations).toEqual(16)
      

      console.log("Test table number combinations")
  });

  it("A test table can be reset, in that case it will have no rows but it will retain inputs,outputs", () => { 

    test = new TestTable(["A","B","C","D"],["E"])
    test.deleteAllRows()
    console.log(test)
    expect(test.numberInputs).toEqual(4)
    expect(test.numberOutputs).toEqual(1)
    expect(test.numberCombinations).toEqual(0)
    
    console.log("Test table reset")
});

it("New rows may be added, the new rows must have the same number of inputs and outputs as the test table ", () => { 

  test = new TestTable(["A","B","C","D"],["E"])
  test.deleteAllRows()
  expect(test.addRow(["u","u","u","u"],["u"])).toBeTruthy()
  expect(() =>{
    test.addRow([true],[true])
  }).toThrowError()
  expect(() =>{
    test.addRow([true,true,true,true],[true,true])
  }).toThrowError()

  expect(test.numberCombinations).toEqual(1)

  console.log("Test table new rows")
});

it("New rows may be deleted, deletion is based on an index, by default the last one is deleted", () => { 

  test = new TestTable(["A","B","C","D"],["E"])
  expect(test.deleteRow()).toBeTruthy()

  expect(test.deleteRow(0)).toBeTruthy()

  expect(() =>{
    test.deleteRow(17)
  }).toThrowError()

  expect(test.numberCombinations).toEqual(14)

  console.log("Test table delete rows")
});

it("Output values may be changed, if the index is out of bounds an error is thrown", () => { 

  test = new TestTable(["A","B"],["sum","carry"])

  test.setOutput(0,[false,false])
  test.setOutput(1,[true,false])
  test.setOutput(2,[true,false])
  test.setOutput(3,[false,true])
  expect(()=>{
    test.setOutput(4,[true,true])
  }).toThrowError()

  console.log("Test table change output value")
});


it("It should be possible to test a half adder", () => { 

  let halfAdder = combinatorial.halfAdder()
  test = new TestTable(["A","B"],["sum","carry"])

  test.setOutput(0,[false,false])
  test.setOutput(1,[true,false])
  test.setOutput(2,[true,false])
  test.setOutput(3,[false,true])

  expect(test.executeTests(halfAdder)).toEqual(true)
  

  console.log("Test table half adder")
});

it("When testing a half-adder the test table will return false when one value is wrong", () => { 

  let halfAdder = combinatorial.halfAdder()
  test = new TestTable(["A","B"],["sum","carry"])

  test.setOutput(0,[false,false])
  test.setOutput(1,[true,false])
  test.setOutput(2,[true,false])
  test.setOutput(3,[true,true])

  expect(test.executeTests(halfAdder)).toEqual(false)
  

  console.log("Test table half adder wrong value")
});

it("A test table will return false when inputs are not found (test has more inputs than the circuit has, or name is wrong)", () => { 

  let halfAdder = combinatorial.halfAdder()
  test = new TestTable(["C"],["sum","carry"])

  expect(
      test.executeTests(halfAdder)
  ).toEqual(false)
  

  console.log("Test table half adder wrong input")
});


it("It should be possible to test an SR-latch SET - HOLD, RESET - HOLD and Race Condition Case", () => { 

  let halfAdder = sequential.norSrLatch()
  test = new TestTable(["S","R"],["Q","Q'"])
  test.deleteAllRows()

  //Set
  test.addRow([true,false],[true,false])
  test.addRow([false,false],[true,false])
  expect(test.executeTests(halfAdder)).toEqual(true)

  //Reset
  test.addRow([false,true],[false,true])
  test.addRow([false,false],[false,true])
  expect(test.executeTests(halfAdder)).toEqual(true)

  //Race condition
  test.addRow([true,true],[false,false])
  test.addRow([false,false],[false,true])
  expect(test.executeTests(halfAdder)).toEqual(true)

  console.log("Test table half adder")
});

it("When testing an SR-latch the test will fail if a value is different", () => { 

  let halfAdder = sequential.norSrLatch()
  test = new TestTable(["S","R"],["Q","Q'"])
  test.deleteAllRows()

  //Set
  test.addRow([true,false],[true,false])
  test.addRow([false,false],[true,true])
  expect(test.executeTests(halfAdder)).toEqual(false)

  //Reset
  test.addRow([false,true],[false,true])
  test.addRow([false,false],[true,true])
  expect(test.executeTests(halfAdder)).toEqual(false)

  //Race condition
  test.addRow([true,true],[false,false])
  test.addRow([false,false],[true,true])
  expect(test.executeTests(halfAdder)).toEqual(false)

  console.log("Test table half adder")
});

});
