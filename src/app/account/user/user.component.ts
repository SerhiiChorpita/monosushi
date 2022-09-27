import { Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { updateCurrentUser } from '@firebase/auth';
import { Toast, ToastrService } from 'ngx-toastr';
import { AddressComponent } from 'src/app/pages/address/address.component';
import { IUser } from 'src/app/shared/interface/account/userData.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public userDataForm!: FormGroup;
  public currentUserData!: IUser;



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
      phone: [this.currentUserData.phone, Validators.required],
      email: [this.currentUserData.email, Validators.required],
    })
  }

  checkData(): IUser {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    return this.currentUserData = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      phone: currentUser.phoneNumber,
      email: currentUser.email
    }
  }

  userDataChange(): void {
    this.accountService.login(this.userDataForm.value).subscribe(data => {
      data[0].firstName = this.userDataForm.value.firstName;
      data[0].lastName = this.userDataForm.value.lastName;
      data[0].phoneNumber = this.userDataForm.value.phone;
      data[0].email = this.userDataForm.value.email;
      let newUser = data[0];
      console.log(newUser);

      localStorage.setItem('currentUser', JSON.stringify(newUser));
      this.toastr.success('Your data successfully updated');
    })
  }
  openBasketDialog(): void {
    this.dialog.open(AddressComponent, {
      backdropClass: 'dialog-backAdress',
      panelClass: 'auth-dialogAdress',
      autoFocus: false
    })
  }
}

