import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CircuitManipulationService } from '../../services/circuit-manipulation.service';
import { CircuitShareService } from '../../../user-content/services/circuit-share.service';
import { CircuitBuilder } from 'src/app/simulation/objects/creational/CircuitBuilder';

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
    //this.circuitManipulation.setAutoSavePath("circuit")

    this.idSub = this.activatedRoute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    });

    if(!this.loaded && this.id!)
    {
      console.log(this.id)
      console.log(this.circuitShare)
      console.log(this.circuitShare.getCircuit(this.id))
      //get circuit from server
      try{
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
      }catch(e)
      {
        console.log(e)
        let localCircuit = localStorage.getItem("circuit")
        this.circuitManipulation.loadCircuit(localCircuit)
      }
    }
    
  }

  ngOnDestroy(): void {
    this.idSub.unsubscribe()
    this.circuitManipulation.builder = new CircuitBuilder()
  }

}
