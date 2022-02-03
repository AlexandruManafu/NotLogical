export class CircuitEvent{
    constructor(public wireId : string, public newValue : boolean | string, public action : string)
    {
    }
}