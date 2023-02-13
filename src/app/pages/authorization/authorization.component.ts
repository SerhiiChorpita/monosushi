import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { ROLE } from 'src/app/shared/constans/role.constant';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit, OnDestroy {


  public authForm!: FormGroup;
  public loginSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  ngOnDestroy(): void {
    if (this.loginSubscription){
      this.loginSubscription.unsubscribe();
    }
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
    }).catch(e => {
      const { email, password } = this.authForm.value;
      this.toastr.error(e.message)
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      if (user && user['role'] === ROLE.USER) {
        this.router.navigate(['/account']);
        this.toastr.success('User successfully logined in')
      } else if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin']);
        this.toastr.success('ADMIN successfully logined in')
      }
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    })
  }
}
