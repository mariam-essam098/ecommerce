import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from 'src/app/pipe/cut-text.pipe';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule, CutTextPipe,RouterLink],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {
  constructor(private _CartService: CartService) {}
  ordersDetails: any = null;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this._CartService.getAllOrders().subscribe({
      next: (res) => {
        this.ordersDetails = res.data;
      },
    });
  }


}
