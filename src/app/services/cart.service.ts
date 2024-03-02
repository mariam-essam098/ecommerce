import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';

  cartItemNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + 'cart',
      {
        productId: productId,
      }
    );
  }
  getUserCart(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'cart');
  }

  removeFromCart(productId: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart/${productId}`);
  }

  updateCartCount(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(
      this.baseUrl + `cart/${productId}`,
      {
        count: count,
      }
    );
  }

  clearFromCart(): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + 'cart');
  }

  getAllOrders(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'orders');
  }

  checkOut(id: string|null, orderInfo: object): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + `orders/checkout-session/${id}?url=https://ecommerce-website-mohamed-mosad.vercel.app`,
      {
        shippingAddress: orderInfo,
      }
    );
  }

  getCount(): void {
    this.getUserCart().subscribe({
      next: (res) => {
        const products = res.data.products;
        let totalCount = 0;
        for (let i = 0; i < products.length; i++) {
          totalCount += products[i].count;
        }
        this.cartItemNumber.next(totalCount);
      },
    });
  }
}
