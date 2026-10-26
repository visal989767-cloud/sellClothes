import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/catalog/catalog').then(component => component.CatalogComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then(component => component.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart').then(component => component.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout').then(component => component.CheckoutComponent)
  },
  {
    path: 'invoice',
    loadComponent: () =>
      import('./pages/invoice/invoice').then(component => component.InvoiceComponent)
  },
  {
    path: 'invoice/:id',
    loadComponent: () =>
      import('./pages/invoice/invoice').then(component => component.InvoiceComponent)
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/order-history/order-history').then(component => component.OrderHistoryComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then(component => component.NotFoundComponent)
  }
];
