import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  errMsg: string = '';
  isloading: boolean = false;

  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword: [''],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/gm)],
      ],
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );

  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const repassword = group.get('rePassword');
    if (repassword?.value === '') {
      repassword.setErrors({ required: true });
    } else if (password?.value !== repassword?.value) {
      repassword?.setErrors({
        notMatch: true,
      });
    }
    return;
  }

  handleRegisterForm(): void {
    this.isloading = true;

    const registerFormData = this.registerForm.value;

    if (this.registerForm.valid) {
      this._AuthService.registerForm(registerFormData).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this._Router.navigate(['/login']);
          }
          this.isloading = false;
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.isloading = false;
        },
      });
    }
  }
}
