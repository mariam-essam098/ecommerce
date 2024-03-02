import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormControlOptions,
} from '@angular/forms';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent {
  constructor(private _ForgetPasswordService: ForgetPasswordService, private _Router: Router) {}

  userMsg: string = '';
  isloading: boolean = false;

  updatePasswordForm: FormGroup = new FormGroup(
    {
      currentPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
      rePassword: new FormControl(''),
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

  handleUpdatePassword(): void {
    this.isloading = true;
    this._ForgetPasswordService
      .UpdateUserPassword(this.updatePasswordForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.userMsg = res.message;
            this._Router.navigate(['/home']);
          }
          this.isloading = false;
        },
        error: (err) => {
          this.userMsg = err.error.message;
          this.isloading = false;
        },
      });
  }
}
