import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportGuard } from '../guards/report.guard';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '', canActivate: [ReportGuard], canActivateChild: [ReportGuard],
    // TODO report step19
    // add canActivate,canActivateChild
    children: [
      { path: 'report-list', component: ReportListComponent },
      { path: 'report/:rptId', component: ReportComponent },
      { path: '', redirectTo: 'report-list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
