import { Injector } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { UserService } from '../user/service/user.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(
    private injector: Injector,
    private utils: UtilsService,
    private userService: UserService
  ) { }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.utils.isTokenExpired()) {
        // TODO user step7
        // dispatch getUser action

        // TODO user step8
        // select selectIsLogin
        return this.userService.checkUser()
          .subscribe(res => {
            if (res) {
              interval(1000 * 60 * 5).subscribe(_ => this.checkStatus());
            }
            resolve(res);
          }, err => {
            console.log(err);
            reject(err);
          });
      }
    });
  }

  checkStatus(): void {
    if (this.utils.isTokenExpired()) {
      // TODO user step9
      // dipatch logout action
      this.userService.logout();
      const router = this.injector.get(Router);
      router.navigate(['/']);
      console.log('logout due to token expired');
    }
  }
}
