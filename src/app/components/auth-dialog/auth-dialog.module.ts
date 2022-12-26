import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthDialogRoutingModule } from './auth-dialog-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthDialogComponent } from './auth-dialog.component';

@NgModule({
  declarations: [
    AuthDialogComponent
  ],
  imports: [
    CommonModule,
    AuthDialogRoutingModule,
    SharedModule
  ]
})
export class AuthDialogModule { }
