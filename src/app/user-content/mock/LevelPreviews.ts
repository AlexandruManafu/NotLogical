import { CircuitPreview } from "../objects/CircuitPreview";
import { LevelPreview } from "../objects/LevelPreview";

export class LevelPreviews{

    public previews : Array<LevelPreview> = []

    constructor(){
        this.previews.push(new LevelPreview(1,"Mock 1",0,"","Author1"), new LevelPreview(1,"Mock 2",1000,"","Author1",200))
    }

}