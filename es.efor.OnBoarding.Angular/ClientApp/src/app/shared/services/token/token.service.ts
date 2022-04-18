import { Injectable } from '@angular/core';
import { LoginResponseDto } from '../../api/models';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: LoginResponseDto = null;

  constructor(
  ) {
    this.getStoredToken();
  }

  getStoredToken() {
    return new Promise<LoginResponseDto>((resolve) => {
      this.token = JSON.parse(localStorage.getItem('auth'));
      if (!this.token || moment().isSameOrAfter(this.token.expiration)) {
        resolve(null);
      }else{
        resolve(this.token);
      }
    });
  }
  setStoredToken(newData: LoginResponseDto) {
    localStorage.setItem('auth', JSON.stringify(newData));
    this.token = newData;
  }
}
