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

    public static removeItem(key : any, arr : Array<any>)
    {
        const index = arr.indexOf(key, 0);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }

    public static binaryStringToArray(word : string, length : number)
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

    public static getMaximumNumberBinary(length : number)
    {
        let result = 0
        for(let i = 0;i<length ;i++)
        {
            result += 2**(i)
        }
        return result;
    }
    
}