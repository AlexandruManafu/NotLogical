import { Component, Input, OnInit } from '@angular/core';
import { CircuitPreview } from '../../objects/CircuitPreview';
import { CircuitEntriesService } from '../../services/circuit-entries.service';

@Component({
  selector: 'app-circuit-entry',
  templateUrl: './circuit-entry.component.html',
  styleUrls: ['./circuit-entry.component.css']
})
export class CircuitEntryComponent implements OnInit {

  constructor(public circuitEntriesService : CircuitEntriesService) { }

  @Input() circuitPreview : CircuitPreview | undefined = undefined
  @Input() previewImageBase64 = "data:image/png;base64,";

  ngOnInit(): void {
    this.previewImageBase64 += this.circuitPreview!.image;
  }

  selectCircuit()
  {
    
  }

}
