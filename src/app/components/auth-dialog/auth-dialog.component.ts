import { Component, OnInit, Optional } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constans/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {


  public authForm!: FormGroup;
  public registrForm!: FormGroup;
  public isLogin = false;
  public checkPassword = false;

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
    this.initRegistrForm();
  }

  initRegistrForm(): void {
    this.registrForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      passwordRepeat: [null, [Validators.required]]
    })
  }
  registerUser(): void {
    const { firstName, lastName, phoneNumber, email, password, passwordRepeat } = this.registrForm.value;
    if (password === passwordRepeat) {
      this.emailSignUp(firstName, lastName, phoneNumber, email, password).then(() => {
        this.toastr.success('User successfully created');
        this.isLogin = !this.isLogin;
        this.authForm.reset();
      }).catch(e => {
        this.toastr.error(e.message)
      })
    } else {
      this.toastr.error('Password does not match another');
    }
  }
  async emailSignUp(name: string, surName: string, tel: string, email: string, password: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      firstName: name,
      lastName: surName,
      phoneNumber: tel,
      address: '',
      orders: [],
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }
  loginUser(): void {
    const { email, password } = this.authForm.value;
    if (email !== 'admin@gmail.com') {
      this.login(email, password).then(() => {
        this.toastr.success('User successfully logined in'),
          this.dialogRef.close()
      }).catch(e => {
        this.toastr.error(e.message)
      })
    } else {
      this.toastr.error('Access for admin from /auth');
      this.authForm.reset();
      this.dialogRef.close();
    }
  }
  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) {
        this.router.navigate(['/account']);
      } else if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin']);
      }
      this.accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    })
  }

  chekConfirmedPassword():void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if(this.password.value !== this.confirmed.value){
      this.registrForm.controls['passwordRepeat'].setErrors({
        matchError: `Password confirmation doesn't match`
      })
    }
}

get password():AbstractControl{
    return this.registrForm.controls['password'];
}

get confirmed():AbstractControl{
  return this.registrForm.controls['passwordRepeat'];
}

checkVisibilityError(control:string, name:string):boolean|null{
  return this.registrForm.controls[control].errors?.[name];
}

onNoClick(): void {
  this.dialogRef.close();
}

changeIsLogin(): void {
  this.isLogin = !this.isLogin;
}
}
