import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../user/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  login$: Observable<boolean>;
  user$: Observable<User>;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // this.login$ = of(true);
    this.login$ = this.userService.getLoginStatus();
    this.user$ = this.userService.getCurrentUser();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }


}
