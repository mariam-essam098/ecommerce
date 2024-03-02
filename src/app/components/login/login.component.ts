import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControlOptions } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) { }

  errMsg: string = '';
  isloading: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    });


  handleLoginForm(): void {
    this.isloading = true;

    const loginFormData = this.loginForm.value;

    if (this.loginForm.valid) {
      this._AuthService.loginForm(loginFormData).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            localStorage.setItem('etoken', res.token);
            this._AuthService.decodeUser();
            this._Router.navigate(['/home']);
            this.isloading = false;
          }
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.isloading = false;
        },
      });
    }
  }
}
