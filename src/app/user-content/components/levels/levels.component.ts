import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LevelPreviews } from '../../mock/LevelPreviews';
import { LevelPreview } from '../../objects/LevelPreview';
import { CircuitEntriesService } from '../../services/circuit-entries.service';
import { LevelSearchService } from '../../services/level-search.service';
import { LevelShareService } from '../../services/level-share.service';
import { LoginService } from '../../../general/services/login.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css','../circuits/circuits.component.css']
})
export class LevelsComponent implements OnInit {

  levelPreviews : Array<LevelPreview> = []
  searchSub = new Subscription()

  constructor(
    private router : Router,
    private loginService : LoginService,
    private previewSearch : CircuitEntriesService,
    private levelSearch : LevelSearchService
    ) { }

  ngOnInit(): void {
    //let mock = new LevelPreviews()
    //this.levelPreviews = mock.previews

    this.searchSub = this.previewSearch.searchTermMessage.subscribe(params => {
      this.levelPreviews = []
        this.getLevels(params)
    });
  }

  buildLevel()
  {
      this.router.navigate(["/LevelBuilder/1"])
  }

  isUserLoggedIn() : boolean
  {
    return this.loginService.isUserLoggedIn()
  }

  getLevels(searchTerm : string)
  {
    this.levelSearch.getLevels(searchTerm).subscribe(
      (response) => {
        console.log(response)
        let received = JSON.parse(JSON.stringify(response))
        if(received.body != "GET circuits Failed")
        {
          for(let i = 0;i<received.length;i++)
          {
            let temp = received[i]

            this.levelPreviews.push(new LevelPreview(temp.id, temp.name, temp.views, "", temp.ownerName, temp.correctSubmissions))
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe()
    this.previewSearch.changeSearchTerm("");
  }

}
