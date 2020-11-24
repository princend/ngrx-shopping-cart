import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import * as fromUserActions from '../../store/actions/user.actions';
import { selectIsLogin } from 'src/app/store/selectors/user.selectors';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>
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
    this.spinner.show();
    const DURATION = { duration: 3000 };
    this.store.dispatch(fromUserActions.login({ payload: this.form.value }));

    this.store.select(selectIsLogin).pipe(
      filter(status => status)
    ).subscribe(res => {
      this.spinner.hide();
      console.log(res, 'res');
      if (res) {
        this.snackbar.open('登入成功', 'OK', DURATION);

        // TODO router step10
        // dispatch go action
        this.router.navigate(['/member']);
      }
    }
    );

  }
}
