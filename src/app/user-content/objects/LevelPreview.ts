import { CircuitPreview } from "./CircuitPreview"

export class LevelPreview extends CircuitPreview{

    constructor(
        override id:number,
        override name:string,
        override views:number = 0,
        override image="",
        override author:string = "",
        public correctSubmissions : number = 0
        ){
        super(id,name,views,image,author)
    }


    override loadFromObject(object:any)
    {
        this.id = object.id
        this.name = object.name
        this.views = object.views
        this.author = object.author
        this.correctSubmissions = object.correctSubmissions
    }
  
}