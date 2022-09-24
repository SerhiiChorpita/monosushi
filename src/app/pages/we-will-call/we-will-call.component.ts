import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-we-will-call',
  templateUrl: './we-will-call.component.html',
  styleUrls: ['./we-will-call.component.scss']
})
export class WeWillCallComponent implements OnInit {

  public callForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WeWillCallComponent>
  ) { }

  ngOnInit(): void {
    this.initCallForm();
  }

  initCallForm(): void {
    this.callForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]]
    })
  }

  callUser(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
