import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportComponent } from './report/report.component';
import { ShareModule } from '../share';
import { PlatformModule } from '@angular/cdk/platform';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ReportListComponent, ReportComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    FormsModule,
    PlatformModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class MemberModule { }
