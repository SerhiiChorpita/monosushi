import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddressComponent } from 'src/app/pages/address/address.component';
import { IUser } from 'src/app/shared/interface/account/userData.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { getAuth, updateProfile, User } from "firebase/auth";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public userDataForm!: FormGroup;
  public currentUserData!: IUser;
  public currentUser: IUser = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  };

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private auth: Auth,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.checkData();
    this.initUserDataForm();
  }

  initUserDataForm(): void {
    this.userDataForm = this.fb.group({
      firstName: [this.currentUserData.firstName, Validators.required],
      lastName: [this.currentUserData.lastName, Validators.required],
      phoneNumber: [this.currentUserData.phoneNumber, Validators.required],
      email: [this.currentUserData.email, Validators.required],
    })
  }

  checkData(): IUser {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }

    return this.currentUserData = {
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      phoneNumber: this.currentUser.phoneNumber,
      email: this.currentUser.email
    }
  }

  userDataChange(): void {
    const auth = getAuth();

    this.accountService.updateUserFirebase(this.userDataForm.value, auth.currentUser?.uid as string
    ).then(() => {
      this.toastr.success('Your data successfully updated');
    }).catch((error) => {
      this.toastr.error(error)
    });
  }

  openBasketDialog(): void {
    this.dialog.open(AddressComponent, {
      backdropClass: 'dialog-backAdress',
      panelClass: 'auth-dialogAdress',
      autoFocus: false
    })
  }
}

