import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
    private spinner: NgxSpinnerService
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
    // TODO user step1
    // 登入時dispatch login action

    // TODO user step2
    // 取得 selectIsLogin 當 isLogin ===true ,導頁至會員頁面
    this.userService.login(this.form.value).subscribe(res => {
      this.spinner.hide();
      if (res) { this.snackbar.open('登入成功', 'OK', DURATION); }

      // TODO router step20
      // dispatch go action
      this.router.navigate(['/member']);
    });
  }
}
