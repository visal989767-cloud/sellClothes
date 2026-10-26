import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartLine, StoreService } from '../../core/store.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  constructor(readonly store: StoreService) {}

  productFor(line: CartLine) {
    return this.store.getProduct(line.id);
  }

  setQuantity(index: number, quantity: number): void {
    this.store.updateQuantity(index, quantity);
  }
}
