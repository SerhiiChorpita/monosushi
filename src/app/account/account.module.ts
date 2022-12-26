import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserHistoryComponent } from './user-history/user-history.component';
import { AccountComponent } from './account.component';
import { UserPasswordComponent } from './user-password/user-password.component';
import { UserComponent } from './user/user.component';
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    AccountComponent,
    UserHistoryComponent,
    UserPasswordComponent,
    UserComponent
  ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        SharedModule,
        MatTableModule
    ]
})
export class AccountModule { }
