import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../core/products.data.js';
import { StoreService } from '../../core/store.service';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent {
  product?: Product;
  selectedSize = 'M';
  quantity = 1;
  imageIndex = 0;
  added = false;

  constructor(route: ActivatedRoute, destroyRef: DestroyRef, readonly store: StoreService) {
    route.paramMap.pipe(takeUntilDestroyed(destroyRef)).subscribe(params => {
      this.product = this.store.getProduct(params.get('id'));
      this.imageIndex = 0;
      this.selectedSize = 'M';
      this.quantity = 1;
    });
  }

  changeImage(step: number): void {
    if (!this.product?.images.length) return;
    this.imageIndex = (this.imageIndex + step + this.product.images.length) % this.product.images.length;
  }

  addToBag(): void {
    if (!this.product) return;
    this.store.addToCart(this.product.id, this.selectedSize, this.quantity);
    this.added = true;
    setTimeout(() => this.added = false, 1400);
  }
}
