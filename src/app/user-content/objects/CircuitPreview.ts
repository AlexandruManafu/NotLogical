export class CircuitPreview{

    constructor(public id:number, public title:string, public views:number = 0, public image=""){}

    getShortTitle(numberCharacters: number)
    {
        return this.title.slice(0,numberCharacters)
    }
  
}