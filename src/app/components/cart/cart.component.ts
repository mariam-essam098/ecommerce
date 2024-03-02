import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}

  cartData: any = null;

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartData = res.data;
      },
    });
  }

  removeItem(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');

    this._CartService.removeFromCart(id).subscribe({
      next: (res) => {
        this._CartService.getCount();
        this.cartData = res.data;
        this._Renderer2.removeAttribute(element, 'disabled');
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  changeCount(
    id: string,
    count: number,
    element1: HTMLButtonElement,
    element2: HTMLButtonElement
  ): void {
    if (count >= 1) {
      this._Renderer2.setAttribute(element1, 'disabled', 'true');
      this._Renderer2.setAttribute(element2, 'disabled', 'true');
      this._CartService.updateCartCount(id, count).subscribe({
        next: (res) => {
          this._CartService.getCount();
          this.cartData = res.data;
          this._Renderer2.removeAttribute(element1, 'disabled');
          this._Renderer2.removeAttribute(element2, 'disabled');
          if (count === 0) {
            this.clearCartData();
          }
        },
        error: (err) => {
          this._Renderer2.removeAttribute(element1, 'disabled');
          this._Renderer2.removeAttribute(element2, 'disabled');
          console.log(err);
        },
      });
    } else {
      this.removeItem(id, element1);
      this._Renderer2.setAttribute(element2, 'disabled', 'true');
    }
  }

  clearCartData(): void {
    this._CartService.clearFromCart().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.cartData = null;
          this._CartService.cartItemNumber.next(0);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
