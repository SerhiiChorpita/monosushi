import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  public addressForm!: FormGroup;
  apiLoaded: Observable<boolean>;

  constructor(
    httpClient: HttpClient,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddressComponent>
  ) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {
    this.initCallForm();
  }

  initCallForm(): void {
    this.addressForm = this.fb.group({
      addressType: [null, [Validators.required]],
      street: [null, [Validators.required]],
      buildingNumber: [null, [Validators.required]],
      apartmentNumber: [null, [Validators.required]]
    })
  }

  addAddress(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
