import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../user/service/user.service';
import { AppState } from '../store/index';
import { selectIsLogin, selectCurrentUser } from '../store/selectors/user.selectors';
import { logout } from '../store/actions/user.actions';
import { go } from '../store/actions/router.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  login$: Observable<boolean>;
  user$: Observable<string>;
  constructor(private userService: UserService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.login$ = of(true);
    this.login$ = this.store.select(selectIsLogin);
    // this.login$ = this.userService.getLoginStatus();
    this.user$ = this.store.select(selectCurrentUser);
    // this.user$ = this.userService.getCurrentUser();
  }

  logout(): void {
    this.store.dispatch(logout());
    // this.userService.logout();
    this.store.dispatch(go({ payload: { path: ['/'] } }));
    // this.router.navigate(['/']);
  }


}
