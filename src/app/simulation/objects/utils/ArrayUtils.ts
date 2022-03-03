export class ArrayUtils{

    public static arraysEqual(key1 : Array<any>,key2 : Array<any>)
    {
        if(key1.length != key2.length)
            return false
        for(let i = 0;i<key1.length;i++)
        {
            if(key1[i] != key2[i])
                return false
        }
        return true
    }
    
}