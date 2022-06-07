import { Simulator } from "./Simulator";
import { TruthTable } from "./TruthTable";
import { ArrayUtils } from "./utils/ArrayUtils";


/*
In order to brute-force test a sequential circuit you need (2^n)! * 2^n iterations 
Thus here we define a more basic but less complete way
When executing each row is executed simulated and tested in order, 
the simulator keeps its state from one execution to another
*/
export class TestTable{

    private defaultOutput : Array<string | boolean> = []
    private defaultInput : Array<string|boolean> = []
    public mapAsArray : Array<{input:Array<string|boolean>,output:Array<string|boolean>}>= []

    public passedSpecifications : Array<boolean> = []

    constructor(
        public inputs : Array<string>,
        public outputs: Array<string>,
        public testName = "Test",
        public empty = false
    )
    {
        if((inputs.length == 0 || outputs.length == 0) && !empty)
            throw new Error("A test table should have at least one input and one output")
        else if (!empty)
            this.createDefaultTable()
    }

    loadFromObject(object : any)
    {
        this.testName = object.testName
        this.inputs = object.inputs
        this.outputs = object.outputs
        this.defaultOutput = object.defaultOutput
        this.defaultInput = object.defaultInput
        this.mapAsArray = object.mapAsArray
        this.passedSpecifications = object.passedSpecifications
    }
    
    get numberCombinations()
    {
        return this.mapAsArray.length
    }

    get numberInputs()
    {
        return this.inputs.length
    }

    get numberOutputs()
    {
        return this.outputs.length
    }

    get inputValues()
    {
        let result : Array<Array<string|boolean>> = []
        for(let i = 0;i<this.mapAsArray.length;i++)
        {
            result.push(this.mapAsArray[i].input)
        }
        return result
    }

    get outputValues()
    {
        let result : Array<Array<string|boolean>> = []
        for(let i = 0;i<this.mapAsArray.length;i++)
        {
            result.push(this.mapAsArray[i].output)
        }
        return result
    }

    public cycleInputValue(row:number,col:number,forOutputs?:boolean)
    {
        console.log("Cycle Input " + row + " " + col)
        let target = this.mapAsArray[row].input[col]
        if(forOutputs!)
        {
            target = this.mapAsArray[row].output[col]
        }
        if((target! || !target!) && forOutputs==undefined)
        {
            if(target=="u")
                this.mapAsArray[row].input[col] = true;
            else if(target == true)
                this.mapAsArray[row].input[col] = !target
            else if(!target)
                this.mapAsArray[row].input[col] = "u"
            else if(target=="*")
                this.mapAsArray[row].input[col] = "u"
            return
     
        }
        else if((target! || !target!) && forOutputs!)
        {
            console.log("Outputs")
            if(target=="u")
                this.mapAsArray[row].output[col] = true;
            else if(target == true)
                this.mapAsArray[row].output[col] = !target
            else if(!target)
                this.mapAsArray[row].output[col] = "u"
            else if(target=="*")
                this.mapAsArray[row].output[col] = "u"
            return
        }
        throw new Error("cycleInputValue invalid value in table "+target)
    }

    setInputValue(row:number,col:number,value:string|boolean)
    {
        console.log("Set Input "+value + " " + row + " " + col)
        let target = this.mapAsArray[row].input[col]
        if(target! || !target!)
        {
            this.mapAsArray[row].input[col] = value
        }
    }

    setOutputValue(row:number,col:number,value:string|boolean)
    {
        if(this.mapAsArray[row].output[col]!)
        {
            this.mapAsArray[row].output[col] = value
        }
    }

    setOutput(index : number, value : Array<string|boolean>)
    {
        if(this.mapAsArray[index]!)
            this.mapAsArray[index].output = value
        else
            throw new Error("Cannot set output : "+ index +" length is : "+this.numberCombinations)
    }
    
    
    private createDefaultTable()
    {
        for(let i = 0;i<this.outputs.length;i++)
        {
            this.defaultOutput.push("u")
        }
        for(let i = 0;i<this.inputs.length;i++)
        {
            this.defaultInput.push("u")
        }

        let truthTable = new TruthTable(this.inputs,"unused",this.defaultOutput)
        truthTable.combinationOutputMap.forEach((value,key) =>{
            let outputCopy = JSON.parse(JSON.stringify(this.defaultOutput))
            this.mapAsArray.push({input:key, output:outputCopy})
        })

    }

    public addRow(input? : Array<boolean|string>, output? : Array<boolean|string>)
    {
        if(input! && output!)
        {
            if(input.length != this.numberInputs  || output.length !=  this.numberOutputs)
            {
                let message  = "Input or output length mismatch " 
                message +=  this.numberInputs + " != " +  input.length 
                message += " OR " +  this.numberOutputs + " != " + output.length
                throw new Error(message)
            }
            else
            {
                this.mapAsArray.push({input:input, output:output})
            }
        }
        else
        {
            let inputCopy = JSON.parse(JSON.stringify(this.defaultInput))
            let outputCopy = JSON.parse(JSON.stringify(this.defaultOutput))
            this.mapAsArray.push({input:inputCopy, output:outputCopy})
        }
        return this
    }

    public deleteAllRows()
    {
        this.mapAsArray = []
    }

    public deleteRow(index : number = -1)
    {
        if(index == -1)
            this.mapAsArray.pop()
        else if(index == 0)
            this.mapAsArray.shift()
        else if(this.mapAsArray[index]!)
            this.mapAsArray.splice(index, 1);
        else
            throw new Error("Row "+index + " not found, length is "+this.numberCombinations)
        return this
    }

    private includedHashMap (expectedOutputs : Map<string,string|boolean>, allOutputs : Map<string,string|boolean>){
        let match = true;
        expectedOutputs.forEach((value,key) =>{
            if(value != allOutputs.get(key) || allOutputs.get(key) == "*")
            {
                match = false
            }
        })
        return match;
      }

    private buildMap(keys:Array<string>,values : Array<string|boolean>)
    {
        let map = new Map();
            for(let i = 0; i < keys.length; i++){
            if(values[i] != "*")
               map.set(keys[i], values[i]);
            }
            return map;
    }

    public executeTests(simulator : Simulator):boolean
    {
        let circuit = simulator.circuit!
        if(circuit!)
        {
            let targetInputs = []
            for(let i = 0; i<this.inputs.length;i++)
            {
                try{
                    circuit.getInput(this.inputs[i])
                    targetInputs.push(this.inputs[i])
                }catch(e)
                {
                    //console.log(e)
                    return false
                }
            }

            this.passedSpecifications = []
            let expectedOutputs = this.outputValues
            for(var i = 0;i<expectedOutputs.length;i++)
            {
                let map = this.buildMap(targetInputs,this.inputValues[i])
                simulator.simulate(map)
                
                let output = simulator.getOutputStatesMap()
                let expectedOutputsMap = this.buildMap(this.outputs,expectedOutputs[i])
                if(!this.includedHashMap(expectedOutputsMap,output))
                {
                    this.passedSpecifications.push(false)
                    return false
                }
            
                this.passedSpecifications.push(true)
            }
            //console.log(this.passedSpecifications)
            return true

        }
        else
            throw new Error("Circuit not defined")
    }



}