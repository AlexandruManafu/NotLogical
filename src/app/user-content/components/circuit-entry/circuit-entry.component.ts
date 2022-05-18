import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CircuitPreview } from '../../objects/CircuitPreview';
import { CircuitEntriesService } from '../../services/circuit-entries.service';

@Component({
  selector: 'app-circuit-entry',
  templateUrl: './circuit-entry.component.html',
  styleUrls: ['./circuit-entry.component.css']
})
export class CircuitEntryComponent implements OnInit {

  constructor(public circuitEntriesService : CircuitEntriesService,private router : Router) { }

  @Input() circuitPreview : CircuitPreview | undefined = undefined
  previewImageBase64 = "data:image/png;base64,";

  ngOnInit(): void {
    if(this.circuitPreview!)
    this.previewImageBase64 += this.circuitPreview!.image;
  }

  selectCircuit()
  {
    if(this.circuitPreview!)
      this.router.navigate(["/Circuit/"+this.circuitPreview.id])
  }

}
