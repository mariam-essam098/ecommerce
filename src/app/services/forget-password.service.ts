import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/'

  forgetPassword(userEmail:object): Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'auth/forgotPasswords', userEmail);
  }

  resetCode(resetCode:object): Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'auth/verifyResetCode', resetCode);
  }

  resetNewPassword(newPassword:object): Observable<any>{
    return this._HttpClient.put(this.baseUrl + 'auth/resetPassword', newPassword);
  }

  UpdateUserPassword(userPasswords:object): Observable<any>{
    return this._HttpClient.put(this.baseUrl + 'users/changeMyPassword', userPasswords);
  }


}
