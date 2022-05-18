import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LevelPreviews } from '../../mock/LevelPreviews';
import { LevelPreview } from '../../objects/LevelPreview';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css','../circuits/circuits.component.css']
})
export class LevelsComponent implements OnInit {

  levelPreviews : Array<LevelPreview> = []

  constructor(
    private router : Router,
    private loginService : LoginService
    ) { }

  ngOnInit(): void {
    let mock = new LevelPreviews()
    this.levelPreviews = mock.previews
  }

  buildLevel()
  {
      this.router.navigate(["/LevelBuilder/1"])
  }

  isUserLoggedIn() : boolean
  {
    return this.loginService.isUserLoggedIn()
  }

}
