import { Component, Input, OnInit } from '@angular/core';
import { CircuitEntriesService } from '../../../user-content/services/circuit-entries.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Input() purpose = "circuits"
  searchParameter = ""
  constructor(private circuitEntries : CircuitEntriesService) { }

  ngOnInit(): void {
  }

  onSearchConfirm(){
    if(this.purpose == "circuits")
      this.circuitEntries.changeSearchTerm(this.searchParameter)
    else if(this.purpose == "levels")
      this.circuitEntries.changeSearchTerm(this.searchParameter)
    
  }

}
