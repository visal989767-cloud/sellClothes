import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/products.data.js';
import { StoreService } from '../../core/store.service';
import { ProductCardComponent } from '../../shared/product-card';

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogComponent {
  readonly categories: string[];
  category = 'All';
  searchText = '';
  sortBy = 'featured';

  constructor(route: ActivatedRoute, destroyRef: DestroyRef, readonly store: StoreService) {
    this.categories = ['All', ...new Set(store.products.map(product => product.category))];
    route.queryParamMap.pipe(takeUntilDestroyed(destroyRef)).subscribe(params => {
      const requested = params.get('category') || 'All';
      this.category = this.categories.includes(requested) ? requested : 'All';
    });
  }

  get visibleProducts(): Product[] {
    const query = this.searchText.trim().toLowerCase();
    const products = this.store.products.filter(product =>
      (this.category === 'All' || product.category === this.category) &&
      (!query || product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query))
    );
    if (this.sortBy === 'asc') return products.sort((a, b) => a.price - b.price);
    if (this.sortBy === 'desc') return products.sort((a, b) => b.price - a.price);
    if (this.sortBy === 'name') return products.sort((a, b) => a.name.localeCompare(b.name));
    return products;
  }

  scrollToCatalog(): void {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  }
}
