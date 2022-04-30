import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CircuitManipulationService } from '../../services/circuit-manipulation.service';
import { CircuitShareService } from '../../../user-content/services/circuit-share.service';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.css']
})
export class CircuitComponent implements OnInit,OnDestroy {

  @Input() loaded = false
  id : string | null = null;
  idSub = new Subscription()
  constructor(
    private circuitManipulation : CircuitManipulationService,
    private activatedRoute : ActivatedRoute,
    private circuitShare : CircuitShareService
    ) {}

  ngOnInit(): void {
    this.circuitManipulation.setAutoSavePath("circuit")

    this.idSub = this.activatedRoute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
    });

    if(!this.loaded && this.id!)
    {
      //get circuit from server
      this.circuitShare.getCircuit(this.id).subscribe(
        (response) => {
          console.log(response)
          let obj = JSON.parse(JSON.stringify(response))
          if(obj.body != "GET circuit Failed" && obj.body != "No permissions")
          {
            let content = JSON.parse(JSON.stringify(response))
            this.circuitManipulation.loadCircuit(content.normalizedCircuit)
            this.circuitShare.changeTargetEntry(content)
          }
        })
    }
    
  }

  ngOnDestroy(): void {
    this.idSub.unsubscribe()
  }

}
