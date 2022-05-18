import { Component, OnInit } from '@angular/core';
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
export class TestsWithoutNavigationComponent implements OnInit {

  level = new Level()

  constructor(
    private navigationButtons : NavigationButtonsService,
    private levelManipulation : LevelManipulationService
    ) { }

  ngOnInit(): void {
    this.navigationButtons.changeDisplayNavigation(false)
    this.loadLocalLevel()
    console.log(this.level)
  }

  loadLocalLevel()
  {
    let object = localStorage.getItem("level")
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
