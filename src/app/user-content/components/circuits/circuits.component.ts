import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CircuitPreviews } from '../../mock/CircuitPreviews';
import { CircuitPreview } from '../../objects/CircuitPreview';
import { CircuitEntriesService } from '../../services/circuit-entries.service';

@Component({
  selector: 'app-circuits',
  templateUrl: './circuits.component.html',
  styleUrls: ['./circuits.component.css']
})
export class CircuitsComponent implements OnInit, OnDestroy {

  circuitPreviews : Array<CircuitPreview> = []

  searchSub = new Subscription()
  constructor(private circuitEntries:CircuitEntriesService) { }

  ngOnInit(): void {
    //let mock = new CircuitPreviews()
    //this.circuitPreviews = mock.previews

    this.searchSub = this.circuitEntries.searchTermMessage.subscribe(params => {
      this.circuitPreviews = []
        this.getCircuits(params)
    });

    
  }

  getCircuits(searchTerm : string)
  {
    this.circuitEntries.getCircuits(searchTerm).subscribe(
      (response) => {
        console.log(response)
        let received = JSON.parse(JSON.stringify(response))
        if(received.body != "GET circuits Failed")
        {
          for(let i = 0;i<received.length;i++)
          {
            let temp = received[i]

            this.circuitPreviews.push(new CircuitPreview(temp.id, temp.name,temp.views,"",temp.ownerName))
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe()
    this.circuitEntries.changeSearchTerm("");
  }

}
