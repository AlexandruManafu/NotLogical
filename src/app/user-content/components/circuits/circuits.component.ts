import { Component, OnInit } from '@angular/core';
import { CircuitPreviews } from '../../mock/CircuitPreviews';
import { CircuitPreview } from '../../objects/CircuitPreview';

@Component({
  selector: 'app-circuits',
  templateUrl: './circuits.component.html',
  styleUrls: ['./circuits.component.css']
})
export class CircuitsComponent implements OnInit {

  circuitPreviews : Array<CircuitPreview> = []
  constructor() { }

  ngOnInit(): void {
    let mock = new CircuitPreviews()
    this.circuitPreviews = mock.previews

  }

}
