import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export const TOKEN = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(private jwtHelper: JwtHelperService) { }

  isTokenExpired(token: string = TOKEN): boolean {
    const jwtStr = this.getToken(token);
    if (jwtStr) {
      return this.jwtHelper.isTokenExpired(jwtStr);  // token expired?
    } else {
      return true;
    }
  }

  writeToken(value: string, token: string = TOKEN): void {
    localStorage.setItem(token, value);
  }

  getToken(token: string = TOKEN): string {
    return localStorage.getItem(token);
  }

  removeToken(token: string = TOKEN): void {
    if (this.getToken(token)) {
      localStorage.removeItem(token);
    }
  }
}
