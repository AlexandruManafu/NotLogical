import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/general/services/login.service';
import { CircuitShareService } from '../../../user-content/services/circuit-share.service';
import { SimulationRunnerService } from '../../services/simulation-runner.service';

@Component({
  selector: 'app-simulation-play-bar',
  templateUrl: './simulation-play-bar.component.html',
  styleUrls: ['./simulation-play-bar.component.css']
})
export class SimulationPlayBarComponent implements OnInit,OnDestroy {

  @Input() title = "Simulator"

  circuitName = "";
  targetEntry : any = null
  targetEntrySub = new Subscription()

  menuWidth = this.isUserLoggedIn()? 65 : 60
  menuHeight = 8
  buttonDegrees = 180

  circuitId : null | string = null
  idSub = new Subscription()

  constructor(
    public simulationRunner : SimulationRunnerService,
    private loginService : LoginService,
    private circuitShare : CircuitShareService,
    private router : Router,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.simulationRunner.reset()
    this.idSub = this.activatedRoute.paramMap.subscribe(params => { 
      this.circuitId = params.get('id'); 
    });
    this.targetEntrySub = this.circuitShare.targetEntryMessage.subscribe(params => {
      if(params!)
      {
        this.targetEntry = params
        this.circuitName = params.name
      }
    });
  }
  ngOnDestroy(): void {
    this.idSub.unsubscribe()
    this.targetEntrySub.unsubscribe()
    if(this.targetEntry!)
    this.targetEntry = null
  }

  resetCircuit()
  {
    this.simulationRunner.reset()
  }

  simulateCircuit()
  {
    if(this.simulationRunner.action == "waitingForInput")
      this.simulationRunner.action = ""
    else
      this.simulationRunner.action = "waitingForInput"
  }

  simulateOneStep()
  {
    this.simulationRunner.simulateStepByStep()
  }

  nextInputs()
  {
    this.simulationRunner.nextInputs(1)
  }

  previousInputs()
  {
    this.simulationRunner.nextInputs(-1)
  }

  showOptions()
  {
    if(this.buttonDegrees != 0 && this.circuitId!)
    {
      this.menuHeight = 24
      this.buttonDegrees = 0
    }
    else if(this.buttonDegrees != 0)
    {
      this.menuHeight = 20
      this.buttonDegrees = 0
    }
    else
    {
      this.menuHeight = 8
      this.buttonDegrees = 180
    }
  }

  isUserLoggedIn()
  {
    return this.loginService.getField("user")!
  }

  saveToServer()
  {
    if(this.circuitName.length > 0)
    {
      let builder = this.simulationRunner.circuitManipulation.builder
      let normalizedCircuit = builder.getNormalizedCircuit()
      normalizedCircuit.gateIndex = this.simulationRunner.circuitManipulation.index
      this.circuitShare.uploadCircuit(this.circuitName,normalizedCircuit).subscribe(
        (response) => {
          console.log(response)
          if(response.body != "Circuit upload failed")
          {
            let circuitId = response.body
            this.showOptions()
            this.router.navigate(["/Circuit/"+circuitId])
          }
        })
    }
  }

  shareCircuit()
  {
    this.circuitShare.shareCircuit(this.circuitId!).subscribe(
      (response) => {
        console.log(response)
        if(response.body == "Success")
        {
          this.targetEntry.isPublic = true
          this.showOptions()
        }
      })
  }

  unshareCircuit()
  {
    this.circuitShare.unshareCircuit(this.circuitId!).subscribe(
      (response) => {
        console.log(response)
        if(response.body == "Success")
        {
          this.targetEntry.isPublic = false
          this.showOptions()
        }
      })
  }

  deleteCircuit()
  {
    this.circuitShare.deleteCircuit(this.circuitId!).subscribe(
      (response) => {
        console.log(response)
        if(response.body == "Success")
        {
          this.router.navigate(["/Circuits/"])
        }
      })
  }
}
