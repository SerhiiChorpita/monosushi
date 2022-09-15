import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public buttonNameStatus = true;
  public buttonName: string = 'Дізнатись більше ⮟';

  constructor() { }

  ngOnInit(): void {
    this.scrollToTop()
  }

  btnNameChange() {
    this.buttonNameStatus = !this.buttonNameStatus;
    if (this.buttonNameStatus) {
      this.buttonName = 'Дізнатись більше ⮟';
    } else {
      this.buttonName = 'Згорнути ⮝';
    }
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
