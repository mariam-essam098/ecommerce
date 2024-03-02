import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss'],
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _WishlistService:WishlistService
  ) {}

  cartCount: number = 0;
  wishListCount: number = 0;


  @ViewChild('navbar') navElement!: ElementRef;


  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (window.scrollY > 100) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.addClass(this.navElement.nativeElement, 'shadow');
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow');

    }
  }

  ngOnInit(): void {
    this._CartService.cartItemNumber.subscribe({
      next: (res) => {
        this.cartCount = res;
      },
    });
    this._WishlistService.wishListItemCount.subscribe({
      next: (res) => {
        this.wishListCount = res;
      },
    });
    this._WishlistService.getUserWishlist().subscribe({
      next: (res) => {
        this.wishListCount = res.count;
      },
    })
    this._CartService.getCount();
  }

  signOut(): void {
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }

  @ViewChild('closeNabar') closeNav!: ElementRef;

  closeNavBar() {
    if (this.closeNav.nativeElement.classList.contains('show')) {
      this.closeNav.nativeElement.classList.remove('show');
    }
  }
}
