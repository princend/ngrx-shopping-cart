import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';
import { AppState } from '../store';
import { logout } from '../store/actions/user.actions';
import {
  selectCurrentUser,
  selectIsLogin
} from '../store/selectors/user.selectors';
import { UserService } from '../user/service/user.service';
import * as fromRouteActions from '../store/actions/router.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  login$: Observable<boolean>;
  user$: Observable<string>;
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.login$ = this.store.select(selectIsLogin);
    this.user$ = this.store.select(selectCurrentUser);
  }

  logout(): void {
    this.store.dispatch(logout());
    // TODO router step13
    // disptach go
    // this.router.navigate(['/']);
    this.store.dispatch(fromRouteActions.go({ route: { path: ['/'] } }));
  }
}
