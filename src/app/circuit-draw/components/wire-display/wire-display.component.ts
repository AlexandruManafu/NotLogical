import { Component, Input, OnInit } from '@angular/core';
import { Subscription, throwIfEmpty } from 'rxjs';
import { Wire } from 'src/app/simulation/objects/Wire';
import { SimulationRunnerService } from '../../services/simulation-runner.service';
import { WiringDrawService } from '../../services/wiring-draw.service';

@Component({
  selector: 'app-wire-display',
  templateUrl: './wire-display.component.html',
  styleUrls: ['./wire-display.component.css']
})
export class WireDisplayComponent implements OnInit {
  @Input() wire : Wire | undefined = undefined

  wireStatusSub! : Subscription 
  stateMessage : {id:string,state:string|boolean} = {id:"0",state:"u"}
  colorClass = "" 

  constructor(
    private wiringService : WiringDrawService) { 
    
  }


  ngOnInit(): void {
    if(this.wire!)
    {
      this.wiringService.buildPath(this.wire!)

      this.wireStatusSub = this.wiringService.wireStateMessage.subscribe(
        message => 
        {
          if( message.id == "everyWire")
          {
            //this.stateMessage = message
            this.stateMessage = {id : this.wire!.outgoing.Id, state : this.wire!.incoming.State}
            this.changeColor()
          }
          else
          {
            this.stateMessage = message
            this.changeColorByWire()
          }
        })
    }
  }

  ngOnDestroy(): void {
    if(this.wireStatusSub!)
    this.wireStatusSub.unsubscribe()
  }

  changeColorByWire()
  {
    if(this.wire!.TimesPropagated == 0)
    {
      //console.log(this.wire)
      this.colorClass = ""
    }
    else if(this.wire!.incoming.State == true)
      this.colorClass =  "wireTrue"
    else if(!this.wire!.incoming.State)
      this.colorClass = "wireFalse"
    else
      this.colorClass = "";
  }

  changeColor()
  {
    if( this.wire!.incoming.State == true)
      this.colorClass =  "wireTrue"
    else if( !this.wire!.incoming.State)
      this.colorClass = "wireFalse"
    else
      this.colorClass = "";

  }

}
