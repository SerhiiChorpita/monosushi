import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  public sliderStatus = true;
  public sliderMoveStatus!: boolean;
  public evX1!: number;
  public evX2!: number;
  public arrowLeft = '<';
  public arrowRight = '>';
  public arrowUp = '⮝';
  public arrowDown = '⮟';

  public question1 = true;
  public question2 = true;
  public question3 = true;
  public question4 = true;


  constructor() { }

  ngOnInit(): void {
  }

  showSliderMove1(event: MouseEvent): void {
    this.evX1 = event.x;
  }
  showSliderMove2(event: MouseEvent): void {
    this.evX2 = event.x;
    if (this.evX1 > this.evX2) {
      this.sliderMoveStatus = false;
    } else {
      this.sliderMoveStatus = true;
    }
  }
  showSliderMove3(): void {
    this.sliderStatus = this.sliderMoveStatus;
  }

}
