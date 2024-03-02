import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _CartService: CartService,
  ) {}
  productData: any = [];
  wishlistArray:string[]=[];
  wishListData: any = [];
  ngOnInit(): void {
    this._WishlistService.getUserWishlist().subscribe({
      next: (res) => {
        this._WishlistService.wishListItemCount.next(res.count);
        const newWishList = this.wishListData.filter((item: any) =>
          this.wishListData.includes(item._id)
        );
        this.wishListData = newWishList;
        this.wishListData = res.data;
      },
    });
  }

  addProduct(id: string, addBtn: HTMLButtonElement): void {
    this._Renderer2.setAttribute(addBtn, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._Renderer2.removeAttribute(addBtn, 'disabled');
        this._CartService.getCount();
      },
      error: (err) => {
        this._Renderer2.removeAttribute(addBtn, 'disabled');
        this._ToastrService.error(err.error.message);
      },
    });
  }

  removeItem(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');

    this._WishlistService.removeItemWishlist(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._WishlistService.getUserWishlist().subscribe({
          next: (res) => {
            this.wishListData = res.data;
            this._WishlistService.wishListItemCount.next(res.count);
          },
        });
        this.wishlistArray = res.data;

        this._Renderer2.removeAttribute(element, 'disabled');
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

}
