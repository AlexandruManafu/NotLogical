import { Component, Input, OnInit } from '@angular/core';
import { TestTable } from 'src/app/simulation/objects/TestTable';
import { LevelManipulationService } from '../../services/level-manipulation.service';

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.css',
  "../level-builder/level-builder.component.css",
  '../circuits/circuits.component.css']
})
export class TestEditComponent implements OnInit {

  @Input() test:TestTable|undefined = undefined

  constructor(private levelManipulation:LevelManipulationService) { }

  ngOnInit(): void {
  }

  deleteRow(index:number)
  {
    console.log(index)
    this.test!.deleteRow(index)
  }

  deleteTest()
  {
    this.levelManipulation.deleteTest(this.test!)
  }

  addRow()
  {
    this.test!.addRow()
  }

}
