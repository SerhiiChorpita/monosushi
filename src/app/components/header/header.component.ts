import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public countCash: number = 0;
  public countArticle: number = 0;

  public basketCheck = true;
  public visibility1!: string;
  public toolBasketBg!: string;
  public toolcountArtBg!: string;

  public willCallCheck = false;
  public visibility2!: string;

  public sideMenuCheck = false;
  public visibility3!: string;
  public toolsideMenu: string = 'background-image: url(../../../assets/images/bars.svg);';

  public drpdwnMenu = false;
  public toolDrpdwnMenu: string = 'background-image: url(../../../assets/images/bars.svg);';




  constructor() { }

  ngOnInit(): void {
    this.basketToggle();
  }

  basketToggle(): void {
    this.basketCheck = !this.basketCheck;
    if (this.basketCheck) {
      this.visibility1 = 'display:block; opacity: 1; visibility: visible;';
      this.toolBasketBg = 'height:4%';
      this.toolcountArtBg = '';
      document.body.style.overflow = 'hidden';
    } else {
      this.visibility1 = '';
      this.toolBasketBg = '';
      this.toolcountArtBg = 'background-color: white';
      document.body.style.overflow = 'visible';
    }
  }
  callToggle(): void {
    this.willCallCheck = !this.willCallCheck;
    if (this.willCallCheck) {
      this.visibility2 = 'display:flex; opacity: 1; visibility: visible;';
      this.visibility3 = '';
      this.sideMenuCheck = false;
      document.body.style.overflow = 'hidden';
    } else {
      this.visibility2 = '';
      document.body.style.overflow = 'visible';
    }
  }
  sideMenuToggle(): void {
    this.sideMenuCheck = !this.sideMenuCheck;
    if (this.sideMenuCheck) {
      this.visibility3 = 'display:flex; opacity: 1; visibility: visible;';
      document.body.style.overflow = 'hidden';
      this.toolsideMenu = 'background-image:url(../../../assets/images/multiply.svg);'
    } else {
      this.visibility3 = '';
      document.body.style.overflow = 'visible';
      this.toolsideMenu = 'background-image: url(../../../assets/images/bars.svg);';
    }
  }
  changeValue(): void {
    this.drpdwnMenu = !this.drpdwnMenu;
    if (this.drpdwnMenu) {
      this.toolDrpdwnMenu = 'background-image:url(../../../assets/images/multiply.svg);';
    } else {
      this.toolDrpdwnMenu = 'background-image:url(../../../assets/images/bars.svg);';

    }
  }
}
