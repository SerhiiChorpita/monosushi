import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-delivery-and-payment',
  templateUrl: './delivery-and-payment.component.html',
  styleUrls: ['./delivery-and-payment.component.scss']
})
export class DeliveryAndPaymentComponent implements OnInit {
  apiLoaded: Observable<boolean>;

  constructor(
    private httpClient: HttpClient
  ) {
    this.apiLoaded = httpClient.jsonp('http://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {

  }

}
