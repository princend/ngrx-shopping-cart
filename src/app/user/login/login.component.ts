import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromUserActions from '../../store/actions/user.actions';
import { selectIsLogin } from 'src/app/store/selectors/user.selectors';
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
    private store: Store<fromStore.AppState>
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

    console.log(this.form.value, 'value');
    this.store.dispatch(fromUserActions.login({ payload: this.form.value }));
    const DURATION = { duration: 3000 };
    this.store.select(selectIsLogin).subscribe(res => {
      console.log('res = ', res);
      if (res) {
        this.snackbar.open('登入成功', 'OK', DURATION);
        this.router.navigate(['/member']);
      }
      else {
        this.snackbar.open('請檢察使用者名稱及密碼', 'ERROR', DURATION);
      }
    }
    );
    // const DURATION = { duration: 3000 };
    // this.userService.login(this.form.value).subscribe(res => {
    //   this.snackbar.open(res ? '登入成功' : '請檢查使用者名稱及密碼', 'OK', DURATION);
    //   this.router.navigate(['/member']);
    // });

  }


}
