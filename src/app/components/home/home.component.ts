import { WishlistComponent } from './../wishlist/wishlist.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesInterface,Product } from 'src/app/interfaces/product';
import { CutTextPipe } from 'src/app/pipe/cut-text.pipe';
import { ProductService } from 'src/app/services/product.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/pipe/search.pipe';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CutTextPipe,
    CarouselModule,
    RouterLink,
    FormsModule,
    SearchPipe,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}

  productData: Product[] = [];
  categoriesData: CategoriesInterface[] = [];
  searchValue: string = '';
  wishlistArray:string[]=[];
  wishListData: any = [];

  ngOnInit(): void {
    this._ProductService.getProduct().subscribe({
      next: (res) => {
        this.productData = res.data;
      },
    });
    this._ProductService.getCategories().subscribe({
      next: (res) => {
        this.categoriesData = res.data;
      },
    });
    this._WishlistService.getUserWishlist().subscribe({
      next: (res) => {
        const newArrayId = res.data.map((item: any) => item._id);
        this.wishlistArray = newArrayId;
      },
    })
    this._CartService.getCount();
  }

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['Previous', 'Next'],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
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

  categoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
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
        console.log(res);

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
