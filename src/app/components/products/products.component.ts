import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { CutTextPipe } from 'src/app/pipe/cut-text.pipe';
import { SearchPipe } from 'src/app/pipe/search.pipe';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CutTextPipe,
    FormsModule,
    SearchPipe,
    NgxPaginationModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  productData: Product[] = [];
  searchValue: string = '';
  pageSize: number = 0;
  curentPage: number = 1;
  total: number = 0;
  wishlistArray:string[]=[];
  wishListData: any = [];


  ngOnInit(): void {
    this._ProductService.getProduct().subscribe({
      next: (res) => {
        this.productData = res.data;
        this.pageSize = res.metadata.limit;
        this.curentPage = res.metadata.currentPage;
        this.total = res.results;
      },
    });
    this._WishlistService.getUserWishlist().subscribe({
      next: (res) => {
        const newArrayId = res.data.map((item: any) => item._id);
        this.wishlistArray = newArrayId;
      },
    })
  }

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

  pageChanged(event: any): void {
    this._ProductService.getProduct(event).subscribe({
      next: (res) => {
        this.productData = res.data;
        this.pageSize = res.metadata.limit;
        this.curentPage = res.metadata.currentPage;
        this.total = res.results;
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
