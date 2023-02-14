import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { getAuth, updatePassword, User } from "firebase/auth";

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {

  public changePasswordForm!: FormGroup;
  reauthenticate: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initChangePasswordForm();
  }

  initChangePasswordForm(): void {
    this.changePasswordForm = this.fb.group({
      currentPass: [null, Validators.required],
      password: [null, Validators.required],
      repeatNewPass: [null, Validators.required],
    })
  }

  changePassword(): void {
    const auth = getAuth();
    const user = auth.currentUser;

    const newPass = this.changePasswordForm.value;
    if (newPass.password === newPass.repeatNewPass) {
      updatePassword(user as User, newPass.password).then(() => {
        this.toastr.success('Your password successfully updated');
        this.changePasswordForm.reset();
      }).catch((error) => {
        this.toastr.error(error)
      });
    } else {
      this.toastr.success('The entered passwords do not match');
    }
  }

}
