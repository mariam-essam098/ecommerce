import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  cartId: string | null = '';
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        params.get('id');
        this.cartId = params.get('id');
      },
    });
  }
  checkForm: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/gm)],
    ],
    city: [''],
  });

  handleForm(): void {
    const orderData = this.checkForm.value;
    this._CartService.checkOut(this.cartId, orderData).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          window.open(res.session.url, '_self');
        }
      },
    });
  }


}
