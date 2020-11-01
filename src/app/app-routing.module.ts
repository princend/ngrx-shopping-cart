import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberModule } from './member/member.module';

const routes: Routes = [{
  path: '', children: [
    { path: 'home', component: HomeComponent },
    { path: 'user', redirectTo: '/user', pathMatch: 'full' },
    // { path: 'member', loadChildren: './member/member.module#MemberModule' },
    { path: 'member', loadChildren: () => import('./member/member.module').then(m => m.MemberModule) },

    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
