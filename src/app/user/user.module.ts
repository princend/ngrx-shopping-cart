import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ShareModule } from '../share/share.module';
import { UserService } from './service/user.service';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ShareModule
  ],
  providers: [UserService]
})
export class UserModule { }
