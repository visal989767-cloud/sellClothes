import { StoreService } from './store.service';

describe('StoreService', () => {
  let store: StoreService;

  beforeEach(() => {
    localStorage.clear();
    store = new StoreService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('loads the full clothing catalog', () => {
    expect(store.products.length).toBe(16);
    expect(store.getProduct(1)?.name).toBe('Classic White Tee');
  });

  it('merges matching sizes and persists cart quantities', () => {
    store.addToCart(1, 'M', 2);
    store.addToCart(1, 'M', 1);
    store.addToCart(1, 'L', 1);

    expect(store.cart()).toEqual([
      { id: 1, size: 'M', qty: 3 },
      { id: 1, size: 'L', qty: 1 }
    ]);
    expect(store.cartCount()).toBe(4);
    expect(JSON.parse(localStorage.getItem('threadco-cart') || '[]')).toEqual(store.cart());
  });

  it('migrates saved legacy cart entries', () => {
    localStorage.setItem('cart', JSON.stringify([
      { id: 1, size: 'M', quantity: 2 }
    ]));

    store = new StoreService();

    expect(store.cart()).toEqual([{ id: 1, size: 'M', qty: 2 }]);
    store.addToCart(2, 'S');
    expect(localStorage.getItem('cart')).toBeNull();
  });

  it('calculates shipping and tax consistently', () => {
    store.addToCart(1, 'M');

    expect(store.totals()).toEqual({
      subtotal: 24,
      shipping: 5,
      tax: 1.92,
      total: 30.92
    });

    store.addToCart(9, 'M');
    expect(store.totals().shipping).toBe(0);
  });

  it('saves an order and clears the cart only after placement', () => {
    store.addToCart(1, 'L', 2);
    const order = store.placeOrder({
      name: 'Alex Example',
      email: 'alex@example.com',
      phone: '555-0100',
      address: '12 Sample Street',
      city: 'Phnom Penh',
      payment: 'Cash on delivery'
    });

    expect(order.items[0]).toEqual(jasmine.objectContaining({
      id: 1,
      name: 'Classic White Tee',
      size: 'L',
      qty: 2,
      quantity: 2
    }));
    expect(store.getOrder(order.id)?.id).toBe(order.id);
    expect(store.getOrderHistory()[0].id).toBe(order.id);
    expect(store.cart()).toEqual([]);
    expect(localStorage.getItem('threadco-cart')).toBeNull();
  });
});
