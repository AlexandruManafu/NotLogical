export class CircuitEvent{
    constructor(public componentId : string, public newValue : boolean | string, public action : string)
    {
    }
}