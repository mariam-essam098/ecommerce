import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  constructor(private _ForgetPasswordService:ForgetPasswordService, private _Router:Router) { }

  step1:boolean = true;
  step2:boolean = false;
  step3:boolean = false;
  email:string = '';

  userMsg:string = '';

  forgetPassword: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  })
  resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  })

  handleForgetPassword(): void {
    let userEmail = this.forgetPassword.value;
    this.email = userEmail.email;
    this._ForgetPasswordService.forgetPassword(userEmail).subscribe({
      next: (res) => {
        this.userMsg = res.message;
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        this.userMsg = err.error.message;
      }
    })
  }

  resetCode(): void {
    let resetCode = this.resetCodeForm.value;
    this._ForgetPasswordService.resetCode(resetCode).subscribe({
      next: (res) => {
        this.userMsg = res.status;
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        this.userMsg = err.error.message;
      }
    })
  }

  handleNewPassword(): void {
    let newPassword = this.resetPasswordForm.value;
    newPassword.email = this.email;
    this._ForgetPasswordService.resetNewPassword(newPassword).subscribe({
      next: (res) => {
        if (res?.token) {
          localStorage.setItem('etoken', res.token);
          this._Router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.userMsg = err.error.message;
      }
    })
  }

}
