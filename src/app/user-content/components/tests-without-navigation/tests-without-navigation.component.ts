import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationButtonsService } from 'src/app/general/services/navigation-buttons.service';
import { TestTable } from 'src/app/simulation/objects/TestTable';
import { Level } from '../../objects/Level';
import { LevelManipulationService } from '../../services/level-manipulation.service';

@Component({
  selector: 'app-tests-without-navigation',
  templateUrl: './tests-without-navigation.component.html',
  styleUrls: [
  './tests-without-navigation.component.css',
  '../level-builder-condition/level-builder-condition.component.css'
]
})
export class TestsWithoutNavigationComponent implements OnInit, OnDestroy {

  level = new Level()
  levelPath : string | null = "level"
  levelPathSub = new Subscription()

  constructor(
    private navigationButtons : NavigationButtonsService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.navigationButtons.changeDisplayNavigation(false)
    //console.log(this.level)
    this.levelPathSub = this.activatedRoute.paramMap.subscribe(params => { 
      this.levelPath = params.get('id'); 
      console.log(this.levelPath)
      if(this.levelPath!)
        this.loadLocalLevel()
    });
  }

  ngOnDestroy(): void {
    
  }

  loadLocalLevel()
  {
    let object = localStorage.getItem(this.levelPath!)
    if(object!)
    {
      object = JSON.parse(object)
      this.level.loadFromObject(object)
    }
  }

  getRowBackgroundColor(value : boolean | undefined)
  {
    console.log(value)
    if(value == undefined)
    {
      return "background-color: none;"
    }
    else if(!value)
    {
      return "background-color: #CD5C5C;"
    }
    else
    {
      return "background-color: #00CC99;"
    }
  }

}
