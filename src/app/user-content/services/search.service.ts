import { Injectable } from '@angular/core';
import { CircuitEntriesService } from './circuit-entries.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient : HttpClientService, private ciruitEntries:CircuitEntriesService) { }

  public searchCircuits(searchTerm:string)
  {
    this.httpClient.getArray("/search/circuits/"+searchTerm)
  }

  public searchLevels(searchTerm:string)
  {

  }

}
