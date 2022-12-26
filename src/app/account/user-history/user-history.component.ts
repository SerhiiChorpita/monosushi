import { Component, OnInit } from '@angular/core';
import { IOrderHistory } from '../../shared/interface/order-history/order-history.interface';
import * as moment from 'moment';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {

  public time = moment().format('LTS');
  public yyyy = moment().format('MM.YYYY');
  public orderTime = `${this.yyyy} ${this.time}`;

  public myOrders: Array<IOrderHistory>=[
    {
      orderNumber: 1413,
      address: 'вул. Івана Мазепи, 42, Львів ',
      products:[
        {
          name: 'Філадельфія з лососем',
          quantity: 2
        }
      ],
      totalAmount: 510,
      orderTime: this.orderTime,
      status: true
    },
    {
      orderNumber: 743,
      address: 'вул. Тараса Шевченка, 18, Львів ',
      products:[
        {
          name: 'Каліфорнія з лососем',
          quantity: 1
        },
        {
          name: 'Каліфорнія з лососем',
          quantity: 3
        }
      ],
      totalAmount: 820,
      orderTime: this.orderTime,
      status: false
    }
  ];


  public displayedColumns: string[] = ['orderNumber', 'orderTime', 'address', 'totalAmount', 'status', 'repeat'];

    constructor() { }

  ngOnInit(): void {
  }

}
