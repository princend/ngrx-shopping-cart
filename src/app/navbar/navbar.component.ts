import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/index';
import { selectIsLogin, selectCurrentUser, selectCurrentUserfromEntities } from '../store/selectors/user.selectors';
import { logout } from '../store/actions/user.actions';
import { go } from '../store/actions/router.actions';
import { map } from 'rxjs/operators';

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
    // this.login$ = this.store.select(selectIsLogin);
    this.login$ = this.store.select(selectCurrentUserfromEntities).pipe(map(e => e.isLogin));
    // this.user$ = this.store.select(selectCurrentUser);
    this.user$ = this.store.select(selectCurrentUserfromEntities).pipe(map(e => e.currentUser));
  }

  logout(): void {
    this.store.dispatch(logout());
    this.store.dispatch(go({ payload: { path: ['/'] } }));
  }

}
