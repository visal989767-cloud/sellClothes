import { CurrencyPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../core/products.data.js';
import { StoreService } from '../core/store.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly added = signal(false);
  private resetTimer?: ReturnType<typeof setTimeout>;

  constructor(private readonly store: StoreService) {}

  addToBag(): void {
    this.store.addToCart(this.product().id, 'M');
    this.added.set(true);
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => this.added.set(false), 1400);
  }
}
