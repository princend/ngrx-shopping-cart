import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.login$ = this.store.select(selectIsLogin);
    this.user$ = this.store.select(selectCurrentUser);
  }

  logout(): void {
    this.store.dispatch(logout());
    this.store.dispatch(go({ payload: { path: ['/'] } }));
  }

}
