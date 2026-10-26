import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Customer, StoreService } from '../../core/store.service';

@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent {
  customer: Customer = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    payment: 'Cash on delivery'
  };
  error = '';

  constructor(readonly store: StoreService, private readonly router: Router) {}

  get paymentNote(): string {
    if (this.customer.payment === 'Bank transfer') {
      return 'Bank transfer is selected. This demo does not verify transfers or confirm payment.';
    }
    if (this.customer.payment === 'Credit card (demo)') {
      return 'Demo only: no card information is collected and no real payment is processed.';
    }
    return 'Pay for your order when it is delivered.';
  }

  submit(form: NgForm): void {
    this.error = '';
    if (!form.valid) return;
    try {
      const order = this.store.placeOrder({ ...this.customer });
      void this.router.navigate(['/invoice', order.id]);
    } catch (error) {
      this.error = error instanceof Error
        ? error.message
        : 'We could not save your order. Check your browser storage and try again.';
    }
  }
}
