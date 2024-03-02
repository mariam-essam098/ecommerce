import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productDetailsInterface } from 'src/app/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}

  productId: string | null = '';

  productDetails: productDetailsInterface | null = null;
  wishlistArray:string[]=[];
  wishListData: any = [];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
      },
    });

    this._ProductService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
    });
    this._WishlistService.getUserWishlist().subscribe({
      next: (res) => {
        const newArrayId = res.data.map((item: any) => item._id);
        this.wishlistArray = newArrayId;
      },
    })
  }

  detailsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  addProduct(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.getCount();
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
        this._ToastrService.error(err.error.message);
      },
    });
  }
  addedToWishlist(id: string, element: HTMLElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._WishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._WishlistService.wishListItemCount.next(res.data.length)
        this.wishlistArray = res.data;
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
        this._ToastrService.error(err.error.message);
      },
    });
  }

  removeWishListItem(id: string, element: HTMLElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');

    this._WishlistService.removeItemWishlist(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this.wishListData = res.data;
        this._WishlistService.getUserWishlist().subscribe({
          next: (res) => {
            this.wishListData = res.data;
            this._WishlistService.wishListItemCount.next(res.count);
          },
        })
        this.wishlistArray = res.data;
        this._Renderer2.removeAttribute(element, 'disabled');
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }
}
