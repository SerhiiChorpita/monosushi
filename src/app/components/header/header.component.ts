
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constans/role.constant';
import { IProductResponse } from 'src/app/shared/interface/products/products';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { WeWillCallComponent } from 'src/app/pages/we-will-call/we-will-call.component';
import { CheckoutBasketComponent } from 'src/app/pages/checkout-basket/checkout-basket.component';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public basketCheck = true;
  public basketOpenCheck = true;
  public visibility1!: string;
  public toolBasketBg!: string;
  public toolcountArtBg!: string;

  public basket: Array<IProductResponse> = [];

  public total: number = 0;
  public countArticle: number = 0;

  public sideMenuCheck = false;
  public visibility3!: string;
  public toolsideMenu: string = 'background-image: url(../../../assets/images/bars.svg);';

  public loginAdminCheck!: boolean;
  public loginUserCheck!: boolean;
  public authForm!: FormGroup;

  public drpdwnMenu = false;
  public toolDrpdwnMenu: string = 'background-image: url(../../../assets/images/bars.svg);';

  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private route: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.scrollToTop();
    this.loadBasket();
    this.updateBasket();
    this.basketToggle();
    this.checkLogin();
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkLogin();
    })
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  login(): void {
    const auth = getAuth();
    const user = this.authForm.value;
    signInWithEmailAndPassword(auth, user.email, user.password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  openLoginDialog(): void {
    this.onNoClick();
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-backLogin',
      panelClass: 'auth-dialogLogin',
      autoFocus: false
    })
  }

  checkLogin(): void {
    if (localStorage.getItem('currentUser')) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      if (currentUser && currentUser.role === ROLE.ADMIN) {
        this.loginAdminCheck = true;
      } else if (currentUser && currentUser.role === ROLE.USER) {
        this.loginUserCheck = true;
      }
    } else {
      this.loginAdminCheck = false;
      this.loginUserCheck = false;
    }
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string)
    }
    this.getTotalPrice();
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

  openCallDialog(): void {
    this.onNoClick();
    this.dialog.open(WeWillCallComponent, {
      backdropClass: 'dialog-backCall',
      panelClass: 'auth-dialogCall',
      autoFocus: false
    })
  }

  openBasketDialog(): void {
    this.onNoClick();
    this.basketOpenCheck = false;
    this.basketToggle();
    this.dialog.open(CheckoutBasketComponent, {
      backdropClass: 'dialog-backBasket',
      panelClass: 'auth-dialogBasket',
      autoFocus: false
    }).afterClosed().subscribe(data => {
      this.basketToggle();
      this.basketOpenCheck = true;
    })
  }

  sideMenuToggle(): void {
    this.onNoClick();
    this.sideMenuCheck = !this.sideMenuCheck;
    if (this.sideMenuCheck) {
      this.visibility3 = 'display:flex; opacity: 1; visibility: visible;';
      this.toolsideMenu = 'background-image:url(../../../assets/images/multiply.svg);'
    } else {
      this.visibility3 = '';
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

  onNoClick(): void {
    this.dialog.closeAll();
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}

