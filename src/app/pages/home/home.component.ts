import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public buttonNameStatus = true;
  public buttonName: string = 'Дізнатись більше v';



  constructor() { }

  ngOnInit(): void {
  }

  btnNameChange() {
    this.buttonNameStatus = !this.buttonNameStatus;
    if (this.buttonNameStatus) {
      this.buttonName = 'Дізнатись більше v';
    } else {
      this.buttonName = 'Згорнути ^';
    }
  }


}
