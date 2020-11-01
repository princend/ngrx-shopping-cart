import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '', children: [
    { path: 'home', component: HomeComponent },
    { path: 'user', redirectTo: '/user', pathMatch: 'full' },
    // { path: 'member', loadChildren: './member/member.module#MemberModule' },
    { path: 'member', loadChildren: () => import('./member/member.module').then(m => m.MemberModule), canLoad: [AuthGuard] },

    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
