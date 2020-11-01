import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportComponent } from './report/report.component';
import { ShareModule } from '../share';


@NgModule({
  declarations: [ReportListComponent, ReportComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    ShareModule
  ]
})
export class MemberModule { }
