import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interface/products/products';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public basketCheck = true;
  public visibility1!: string;
  public toolBasketBg!: string;
  public toolcountArtBg!: string;

  public total = 0;
  public countArticle: number = 0;
  public basket: Array<IProductResponse> = [];

  public willCallCheck = false;
  public visibility2!: string;

  public sideMenuCheck = false;
  public visibility3!: string;
  public toolsideMenu: string = 'background-image: url(../../../assets/images/bars.svg);';

  public drpdwnMenu = false;
  public toolDrpdwnMenu: string = 'background-image: url(../../../assets/images/bars.svg);';

  public scrolDown = false;
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.basketToggle();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string)
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce((total: number, prod: IProductResponse) =>
      total + prod.count * prod.price, 0)
    this.countArticle = this.basket.reduce((countArticle: number, prod: IProductResponse) =>
      countArticle + prod.count, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value && product.count < 100) {
      ++product.count
    } else if (!value && product.count > 1) {
      --product.count
    }
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
  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}

