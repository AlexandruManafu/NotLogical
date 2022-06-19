import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit,OnDestroy
{
  slides=[
    {title: "Features", path: "navigationDescription.PNG"},
    {title: "Gates And Wires", path: "canvasInstructions.PNG"},
    {title: "Simulation Controls", path: "simulationDescription.PNG"},
    {title: "Inputs, Outputs and Labels", path: "labelsInstructions.PNG"}
    ]

  public targetSlide = 0
  public slide = this.slides[this.targetSlide]

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  updateSlide()
  {
    this.slide = this.slides[this.targetSlide]
    console.log(this.slide)
  }

  public next()
  {
    if(this.targetSlide+1 >= this.slides.length)
      this.targetSlide = 0
    else
      this.targetSlide = this.targetSlide + 1
    this.updateSlide()
    
  }

  public previous()
  {
    if(this.targetSlide-1 < 0)
      this.targetSlide = this.slides.length - 1
    else
      this.targetSlide = this.targetSlide - 1
    this.updateSlide()
  }

  getNavDotClass(index : number)
  {
    let color = index==this.targetSlide? 'greenDot': 'blackDot'
    return [color,"inline"]
  }


}
