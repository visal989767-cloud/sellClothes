import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order, StoreService } from '../../core/store.service';

@Component({
  selector: 'app-invoice',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './invoice.html',
  styleUrl: './invoice.css'
})
export class InvoiceComponent implements OnInit {
  @ViewChild('invoice') private invoiceElement?: ElementRef<HTMLElement>;
  order: Order | null = null;

  constructor(private readonly route: ActivatedRoute, readonly store: StoreService) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.order = this.store.getOrder(orderId);
  }

  print(): void {
    window.print();
  }

  download(): void {
    if (!this.invoiceElement || !this.order) return;
    const content = this.invoiceElement.nativeElement.outerHTML;
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Invoice ${this.order.id}</title><style>
      *{box-sizing:border-box}body{margin:0;padding:24px;background:#f4f6fb;color:#101828;font:15px/1.6 Arial,sans-serif}.invoice{max-width:760px;margin:0 auto;padding:40px;background:#fff;border-radius:12px;box-shadow:0 8px 32px #10182810}.header{display:flex;justify-content:space-between;gap:20px;border-bottom:2px solid #101828;padding-bottom:18px}.brand{font-size:26px;font-weight:800}.accent{color:#2563eb}.muted{color:#687386;font-size:13px}.right{text-align:right}.customer{margin:26px 0}.label{color:#687386;font-size:12px;letter-spacing:1px;text-transform:uppercase}table{width:100%;border-collapse:collapse;margin:24px 0}th,td{padding:10px 7px;border-bottom:1px solid #dfe5ef;text-align:left}.right-cell{text-align:right}.totals{width:270px;max-width:100%;margin-left:auto}.total-row{display:flex;justify-content:space-between;padding:5px 0}.grand{margin-top:8px;padding-top:12px;border-top:2px solid #101828;font-size:19px;font-weight:800}.thanks{margin-top:35px;padding-top:18px;border-top:1px solid #dfe5ef;text-align:center;color:#687386}@media print{@page{size:A4;margin:15mm}body{padding:0;background:#fff}.invoice{max-width:none;padding:0;box-shadow:none}}
    </style></head><body>${content}</body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.order.id.replace(/[^\w-]/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
