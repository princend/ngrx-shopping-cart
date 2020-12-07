import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromUserActions from '../../store/actions/user.actions';
import { selectCurrentUserfromEntities, selectUserEntities, selectUserIds } from 'src/app/store/selectors/user.selectors';
import { go } from '../../store/actions/router.actions';
import { filter, take } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private store: Store<fromStore.AppState>,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.pattern('^[a-zA-Z0-9-_]{5,20}')],
      password: ['', Validators.pattern('^[a-zA-Z0-9-_]{5,20}')],
      rememberMe: [true]
    });
  }
  get username(): AbstractControl { return this.form.get('username'); }
  get password(): AbstractControl { return this.form.get('password'); }
  get rememberMe(): AbstractControl { return this.form.get('rememberMe'); }

  login(): void {

    this.store.dispatch(fromUserActions.login({ payload: this.form.value }));

    const DURATION = { duration: 3000 };
    this.spinner.show();
    this.store.select(selectCurrentUserfromEntities).pipe(filter(e => e.isLogin)).subscribe(e => {
      if (e.isLogin) {
        this.spinner.hide();
        this.snackbar.open('登入成功', 'OK', DURATION);
        this.store.dispatch(go({ payload: { path: ['/member'] } }));
      }
      console.log('adpater的currentUser', e);
    });
  }
}
