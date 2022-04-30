import { TruthTable } from "./TruthTable";
import { ArrayUtils } from "./utils/ArrayUtils";


/* In order to brute-force test a sequential circuit you need (2^n)! * 2^n iterations 
Thus here we define a more basic but less complete way
*/
export class TestTable{

    private defaultOutput : Array<string | boolean> = []
    public mapAsArray : Array<{input:Array<string|boolean>,output:Array<string|boolean>}>= []

    constructor(public inputs : Array<string>, public outputs: Array<string>, public testName = "Test")
    {
        if(inputs.length == 0 || outputs.length == 0)
            throw new Error("A test table should have at least one input and one output")
        else
            this.createDefaultTable()
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
    
    private createDefaultTable()
    {
        for(let i = 0;i<this.outputs.length;i++)
        {
            this.defaultOutput.push("u")
        }

        let truthTable = new TruthTable(this.inputs,"unused",this.defaultOutput)
        truthTable.combinationOutputMap.forEach((value,key) =>{
            this.mapAsArray.push({input:key, output:this.defaultOutput})
        })

    }

    public addRow(input : Array<boolean|string>, output : Array<boolean|string>)
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
            ArrayUtils.removeItem(index,this.mapAsArray)
        else
            throw new Error("Row "+index + " not found, length is "+this.numberCombinations)
        return this
    }

    

}