import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order, StoreService } from '../../core/store.service';

@Component({
  selector: 'app-order-history',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css'
})
export class OrderHistoryComponent {
  readonly orders: Order[];

  constructor(store: StoreService) {
    this.orders = store.getOrderHistory();
  }
}
