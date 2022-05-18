import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OverlayToggleService } from '../../services/overlay-toggle.service';

@Component({
  selector: 'app-level-description-overlay',
  templateUrl: './level-description-overlay.component.html',
  styleUrls: ['./level-description-overlay.component.css']
})
export class LevelDescriptionOverlayComponent implements OnInit,OnDestroy {

  name = "levelDescription"
  @Input() title = "" 
  @Input() description = "" 
  overlayTargetSub = new Subscription()
  display = false
  constructor(private overlayToggle : OverlayToggleService) { }

  ngOnDestroy(): void {
    this.overlayTargetSub.unsubscribe()
    this.overlayToggle.changeTargetEntry("")
  }

  ngOnInit(): void {

    this.overlayTargetSub = this.overlayToggle.targetOverlayMessage.subscribe(
      (message)=>{
        if(message == this.name)
        {
          this.on()
        }
      })

      if(this.title=="")
      {
        this.title = "No Title"
      }
      if(this.description=="")
      {
        this.description = "No \n Description"
      }
  }


  on()
  {
    this.display = true
  }

  off()
  {
    this.display = false
  }

}
