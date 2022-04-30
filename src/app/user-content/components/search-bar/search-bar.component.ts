import { Component, OnInit } from '@angular/core';
import { CircuitEntriesService } from '../../services/circuit-entries.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchParameter = ""
  constructor(private circuitEntries : CircuitEntriesService) { }

  ngOnInit(): void {
  }

  onSearchConfirm(){
    this.circuitEntries.changeSearchTerm(this.searchParameter)
  }

}
