import { TestBed } from '@angular/core/testing';
import { TruthTable } from '../objects/TruthTable';
import { SmallCombinatorial } from './Circuits/SmallCombinatorial';



describe('TruthTable', () => {

  let combinatorial = new SmallCombinatorial()
  let truth = new TruthTable(["A"])

  beforeEach(() =>{
    truth = new TruthTable(["A"])

  })

  afterEach(()=>{
    console.log(truth)
  })

  function expectCombinationOut(combination : Array<boolean | string>,output : string | boolean)
  {
    expect(truth.getOutput(combination)).toEqual(output)
  }

  it("A truth table with n inputs should contain 2^n combinations", () => { 

      let truth = new TruthTable(["A"])
      expect(truth.numberCombinations).toEqual(2)

      truth = new TruthTable(["A","B"])
      expect(truth.numberCombinations).toEqual(4)

      truth = new TruthTable(["A","B","C"])
      expect(truth.numberCombinations).toEqual(8)

      truth = new TruthTable(["A","B","C","D"])
      expect(truth.numberCombinations).toEqual(16)

      console.log("Truth table number combinations")
  });

  it("Half Adder sum output truth table generation should have proper outputs with all the combinations", () => { 

    let simulator = combinatorial.halfAdder()
    truth = TruthTable.compute(simulator,"sum")
    expectCombinationOut([false,false],false)
    expectCombinationOut([false,true],true)
    expectCombinationOut([true,false],true)
    expectCombinationOut([true,true],false)

    console.log("Half Adder Sum Truth table generation")
});

it("Half Adder carry output truth table generation should have proper outputs with all the combinations", () => { 

  let simulator = combinatorial.halfAdder()
  truth = TruthTable.compute(simulator,"carry")
  expectCombinationOut([false,false],false)
  expectCombinationOut([false,true],false)
  expectCombinationOut([true,false],false)
  expectCombinationOut([true,true],true)

  console.log("Half Adder Carry Truth table generation")
});

it("A truth table should be equivalent to itself", () => { 

  let simulator = combinatorial.halfAdder()
  truth = TruthTable.compute(simulator,"carry")
  expect(truth.equivalent(truth)).toEqual(true)

  console.log("Table self equivalence")
});

it("The truth table generated for the Half Adder should be equivalent to the truth table with hardcoded outputs", () => { 

  let simulator = combinatorial.halfAdder()
  truth = TruthTable.compute(simulator,"sum")
  
  let hardcoded = new TruthTable(["X","Y"],"C")
  hardcoded.setOutput([false,false],false)
  hardcoded.setOutput([false,true],true)
  hardcoded.setOutput([true,false],true)
  hardcoded.setOutput([true,true],false)

  expect(truth.equivalent(hardcoded)).toEqual(true)

  console.log("Half Adder Sum Truth table equivalence")
});

it("The truth table generated for the Half Adder should not be equivalent an uninitialized truth table", () => { 

  let simulator = combinatorial.halfAdder()
  truth = TruthTable.compute(simulator,"sum")
  
  let hardcoded = new TruthTable(["X","Y"],"C")

  expect(truth.equivalent(hardcoded)).toEqual(false)

  console.log("Half Adder Sum Truth table not equivalence")
});


});
