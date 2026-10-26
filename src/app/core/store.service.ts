import { computed, Injectable, signal } from '@angular/core';
import { Product, PRODUCTS, SIZES } from './products.data.js';

export interface CartLine {
  id: number;
  size: string;
  qty: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  payment: string;
}

export interface OrderItem {
  id: number;
  name: string;
  category: string;
  price: number;
  size: string;
  qty: number;
  quantity: number;
}

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface Order extends OrderTotals {
  id: string;
  date: string;
  customer: Customer;
  items: OrderItem[];
}

@Injectable({ providedIn: 'root' })
export class StoreService {
  readonly products = PRODUCTS;
  readonly sizes = SIZES;
  readonly cart = signal<CartLine[]>(this.readCart());
  readonly cartCount = computed(() =>
    this.cart().reduce((count, item) => count + item.qty, 0)
  );
  readonly totals = computed(() => this.calculateTotals(this.cart()));

  getProduct(id: number | string | null | undefined): Product | undefined {
    return this.products.find(product => product.id === Number(id));
  }

  addToCart(id: number, size: string, quantity = 1): void {
    const product = this.getProduct(id);
    if (!product) throw new Error('This product is no longer available.');

    const qty = this.normalizeQuantity(quantity);
    const current = this.cart();
    const match = current.find(item => item.id === id && item.size === size);
    const next = match
      ? current.map(item =>
          item === match
            ? { ...item, qty: this.normalizeQuantity(item.qty + qty) }
            : item
        )
      : [...current, { id, size: size || 'M', qty }];

    this.saveCart(next);
  }

  updateQuantity(index: number, quantity: number): void {
    const current = this.cart();
    if (!current[index]) return;
    const next = [...current];
    next[index] = { ...next[index], qty: this.normalizeQuantity(quantity) };
    this.saveCart(next);
  }

  removeFromCart(index: number): void {
    this.saveCart(this.cart().filter((_, itemIndex) => itemIndex !== index));
  }

  clearCart(): void {
    this.saveCart([]);
  }

  getOrder(id?: string | null): Order | null {
    try {
      const history = this.readOrders();
      if (id) {
        const savedOrder = this.readSavedOrder('lastOrder');
        return history.find(order => order.id === id) ??
          (savedOrder?.id === id ? savedOrder : null);
      }
      return this.readSavedOrder('lastOrder');
    } catch (error) {
      console.error('Unable to read the saved order.', error);
      return null;
    }
  }

  getOrderHistory(): Order[] {
    try {
      const history = this.readOrders();
      const lastOrder = this.readSavedOrder('lastOrder');
      return lastOrder && !history.some(order => order.id === lastOrder.id)
        ? [lastOrder, ...history]
        : history;
    } catch (error) {
      console.error('Unable to read order history.', error);
      return [];
    }
  }

  placeOrder(customer: Customer): Order {
    const items = this.cart().flatMap(line => {
      const product = this.getProduct(line.id);
      if (!product) return [];
      const qty = this.normalizeQuantity(line.qty);
      return [{
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        size: line.size,
        qty,
        quantity: qty
      }];
    });
    if (!items.length) throw new Error('Your cart is empty.');
    if (items.length !== this.cart().length) {
      throw new Error('A product in your cart is no longer available.');
    }

    const totals = this.calculateTotals(
      items.map(item => ({ id: item.id, size: item.size, qty: item.qty }))
    );
    const order: Order = {
      id: `INV-${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      customer,
      items,
      ...totals
    };

    try {
      const history = this.readOrders().filter(saved => saved.id !== order.id);
      history.unshift(order);
      localStorage.setItem('orderHistory', JSON.stringify(history));
      localStorage.setItem('lastOrder', JSON.stringify(order));
      localStorage.removeItem('threadco-cart');
      localStorage.removeItem('cart');
      this.cart.set([]);
    } catch (error) {
      console.error('Unable to save this order in browser storage.', error);
      throw new Error('We could not save your order in this browser. Check browser storage and try again.');
    }

    return order;
  }

  private calculateTotals(items: CartLine[]): OrderTotals {
    const subtotal = items.reduce((sum, item) => {
      const product = this.getProduct(item.id);
      return sum + (product?.price ?? 0) * item.qty;
    }, 0);
    const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 5;
    const tax = Number((subtotal * 0.08).toFixed(2));
    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
  }

  private normalizeQuantity(value: number): number {
    return Math.min(99, Math.max(1, Math.floor(Number(value) || 1)));
  }

  private readCart(): CartLine[] {
    try {
      const current = JSON.parse(localStorage.getItem('threadco-cart') || '[]');
      const legacy = JSON.parse(localStorage.getItem('cart') || '[]');
      const lines: CartLine[] = [];

      for (const item of [
        ...(Array.isArray(current) ? current : []),
        ...(Array.isArray(legacy) ? legacy : [])
      ]) {
        const id = Number(item?.id);
        if (!this.getProduct(id)) continue;
        const size = String(item.size || 'M');
        const qty = this.normalizeQuantity(Number(item.qty ?? item.quantity));
        const existing = lines.find(line => line.id === id && line.size === size);
        if (existing) existing.qty = this.normalizeQuantity(existing.qty + qty);
        else lines.push({ id, size, qty });
      }

      return lines;
    } catch (error) {
      console.error('Unable to read the saved shopping cart.', error);
      return [];
    }
  }

  private saveCart(lines: CartLine[]): void {
    this.cart.set(lines);
    try {
      localStorage.setItem('threadco-cart', JSON.stringify(lines));
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Unable to save the shopping cart.', error);
    }
  }

  private readOrders(): Order[] {
    const saved = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    return Array.isArray(saved) ? saved : [];
  }

  private readSavedOrder(key: string): Order | null {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    return saved && Array.isArray(saved.items) ? saved as Order : null;
  }
}
