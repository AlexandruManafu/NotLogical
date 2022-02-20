export class GateSearch{

    public static getIndex(arr : any, id : string) : number
    {
        for(let i = 0;i<arr.length;i++)
        {
            if(arr[i].Id == id)
                return i;
        }
        throw new Error("No Element found for id: " + id)
    }


    public static getGatesbyType(arr: any, type : any)
    {   
        let result : Array<typeof type> = []
        for(let i = 0;i<arr.length ; i++)
        {
            let gate = arr[i]
            if(gate instanceof type)
                result.push(gate)
        } 
        return result
    }

    public static getGateById(arr:any, id : string)
    {
        for(let i = 0;i<arr.length; i++)
        {
            if(arr[i].Id == id)
                return arr[i]
        }
        throw new Error("Element not found : " + id)
    }

    public static getWiresByIO(arr : any, gateId : string, byOutput : boolean) : Array<any>
    {
        let result : Array<any> = []
        for(let i = 0;i<arr.length;i++)
        {
            let wire = arr[i]
            if(byOutput && wire.outgoing.Id == gateId)
                result.push(wire)
            else if(!byOutput && wire.incoming.Id == gateId)
                result.push(wire)
        }
        return result
    }

    
    
}