export class CircuitPreview{

    constructor(public id:number, public name:string, public views:number = 0, public image="", public author:string = ""){}

    getShortTitle(numberCharacters: number)
    {
        let result = this.name.slice(0,numberCharacters)
        return this.name.length > numberCharacters ? result + "..." : this.name
    }

    loadFromObject(object:any)
    {
        this.id = object.id
        this.name = object.name
        this.views = object.views
        this.author = object.author
    }
  
}