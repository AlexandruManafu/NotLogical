import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LevelPreview } from '../../objects/LevelPreview';

@Component({
  selector: 'app-level-entry',
  templateUrl: './level-entry.component.html',
  styleUrls: ['./level-entry.component.css','../circuit-entry/circuit-entry.component.css']
})
export class LevelEntryComponent implements OnInit {

  @Input() levelPreview : LevelPreview | undefined = undefined

  constructor(private router : Router) { }

  previewImageBase64 = "data:image/png;base64,";

  ngOnInit(): void {
    if(this.levelPreview!)
    this.previewImageBase64 += this.levelPreview!.image;
  }

  selectLevel()
  {
    if(this.levelPreview!)
    this.router.navigate(["/Level/"+this.levelPreview.id])
  }

}
