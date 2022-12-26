import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account.component';
import { UserComponent } from './user/user.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { UserPasswordComponent } from './user-password/user-password.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children:[
      { path: 'office', component: UserComponent },
      { path: 'history', component: UserHistoryComponent },
      { path: 'password', component: UserPasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'office' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
