import { Circuit } from "./Circuit";
import { Simulator } from "./Simulator";
import { ArrayUtils } from "./utils/ArrayUtils";

export class TruthTable {


    public combinationOutputMap = new Map<Array<boolean | string>,Array<string|boolean>>()

    constructor(
        public inputs : Array<string>,
        private outputName : string = "",
        protected defaultOutput : Array<string | boolean> = ["u"]
        )
    {
        if(inputs.length == 0)
            throw new Error("A truth table should have at least one input")
        else if(outputName != "NONE")
            this.combinationOutputMap = this.createDefaultOutputs(inputs.length)
    }

    public get Inputs()
    {
        return this.inputs
    }

    public get numberCombinations()
    {
        return this.combinationOutputMap.size
    }

    private binaryStringToArray(word : string, length : number)
    {
        let result = []

        for(let i = 0;i<length - word.length;i++)
        {
            result.push(false)
        }
        for(let i = 0;i<word.length;i++)
        {
            if(word[i] == '0')
                result.push(false)
            else if(word[i] == '1')
                result.push(true)
            else
                throw new Error("binaryStringToArray unexpected letter, 0 or 1 allowed, given "+ word[i])
        }
        return result;
    }

    // given n, compute and 2^(n) iterate and generate
    // if a truth table has n inputs then there are 2^n possible combinations

    public createDefaultOutputs(lengthInputs : number)
    {
        let nrCombinations = 2**lengthInputs
        let binLength = this.inputs.length
        let result = new Map<Array<boolean | string>,Array<string|boolean>>()

        for(let i = 0;i<nrCombinations;i++)
        {
            let binaryString = i.toString(2)
            let combination = this.binaryStringToArray(binaryString,binLength)
            result.set(combination,this.defaultOutput)
        }
        
        return result
    }

    public numberInputs(nrCombinations : number)
    {
        return Math.log(nrCombinations) / Math.log(2)
    }

    //Given a ...
    public generateBinaryCombinations(start : number, nrCombinations:number) : Array<Array<boolean>>
    {
        if(start<0 || nrCombinations < start )
            throw new Error("generateBinaryCombinations start should be >= 0 and > end, given start="+ start + " end=" + nrCombinations)
        let result = []

        let binLength = this.numberInputs(nrCombinations)

        for(let i = start;i<nrCombinations;i++)
        {
            let binaryString = i.toString(2)
            result.push(this.binaryStringToArray(binaryString,binLength))
        }

        return result
    }
    public setOutput(combination : Array<string|boolean>, output : string | boolean) : void
    {
        let valueSet = false
        let map = this.combinationOutputMap
        map.forEach((value,key) =>{
            if(ArrayUtils.arraysEqual(key,combination))
            {
                map.set(key,[output])
                valueSet = true
            }
        })
        if(!valueSet)
            throw new Error ("setOutput combinaton not found "+ combination)
    }
    
    public getOutput(combination : Array<string|boolean>) : boolean | string
    {
        let result : boolean | string = "u"
        let map = this.combinationOutputMap
        map.forEach((value,key) =>{
            if(ArrayUtils.arraysEqual(key,combination))
                result = value[0]
        })
        return result
    }


    public static compute(simulator : Simulator, targetOutput : string) : TruthTable
    {
        let inputs = simulator.circuit!.getInputsForOutput(targetOutput)
        if(inputs.length==0)
            throw new Error("initTable invalid output name or no inputs found for "+ targetOutput)
        let inputsIds = []
        for(let i = 0;i<inputs.length;i++)
        {
            inputsIds.push(inputs[i].Id)
        }

        let result = new TruthTable(inputsIds,targetOutput)
        let possibleInputs = result.combinationOutputMap
        possibleInputs.forEach((value, key) =>{
            simulator.simulateVector(key)
            let output = simulator.getOutputStatesMap().get(targetOutput)
            result.combinationOutputMap.set(key,[output!])
        })
        return result
    }

    public equivalent(otherTable : TruthTable) : boolean
    {
        let result = true
        if(this.numberCombinations != otherTable.numberCombinations)
            return false
        let possibleInputs = this.combinationOutputMap
        possibleInputs.forEach((value, key) =>{
            if(value[0] != otherTable.getOutput(key))
                result = false
        })
        return result
    }
}