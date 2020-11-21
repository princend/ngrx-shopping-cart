import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';
import { AppState } from '../store';
import { UserService } from '../user/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  login$: Observable<boolean>;
  user$: Observable<User>;
  constructor(private userService: UserService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    // TODO user step4
    // select selectIsLogin
    this.login$ = this.userService.getLoginStatus();

    // TODO user step5
    // select selectCurrentUser
    this.user$ = this.userService.getCurrentUser();
  }

  logout(): void {
    // TODO user step6
    // dispatch logout
    this.userService.logout();
    // TODO router step23
    // disptach go
    this.router.navigate(['/']);
  }


}
