import { Circuit } from "src/app/simulation/objects/Circuit"
import { Simulator } from "src/app/simulation/objects/Simulator"
import { TestTable } from "src/app/simulation/objects/TestTable"

export class Level
{
    id = -1
    name = ""
    instructions = ""
    circuit : Circuit | undefined = undefined
    tests : Array<TestTable> = []
    type = "CircuitGivenTables" 
    constructor()
    {

    }

    loadFromObject(object : any)
    {
      this.id = parseInt(object.id)
      this.name = object.name
      this.instructions = object.instructions
      this.tests = []
      for(let i = 0;i<object.tests.length;i++)
      {
        let test = new TestTable([],[],"",true)
        test.loadFromObject(object.tests[i])
        this.tests.push(test)
      }
      this.type = object.type
      console.log(this)
    }

    executeTests() : boolean
    {
      if(this.circuit!)
      {
        let simulator = new Simulator(this.circuit)
        for(let i = 0;i<this.tests.length;i++)
        {
          let testResult = this.tests[i].executeTests(simulator)
          if(!testResult)
            return false
        }
        return true
      }
      else{
        throw new Error("Circuit not defined")
      }
    }

    public invalidName()
    {
      return this.name.length < 4 && this.name.length != 0 
    }

    public invalidInstructions()
    {
      return this.instructions.length < 8 && this.instructions.length != 0;
    }

    public firstStageValid()
    {
      return !this.invalidName() && !this.invalidInstructions() &&
      this.name.length!=0 && this.instructions.length!=0
    } 

    public invalidTestName(name:string)
    {
      return name.length < 4 && name.length != 0 
    }

    public invalidTestInputs(inputs:string)
    {
      return inputs.length < 1;
    }

    public validTest(test : {name:string,inputs:string,outputs:string})
    {
        return !this.invalidTestName(test.name) && test.name.length != 0 &&
                !this.invalidTestInputs(test.inputs) && !this.invalidTestInputs(test.outputs)
    }

    public secondStageValid()
    {
      return this.tests.length > 0
    } 
}