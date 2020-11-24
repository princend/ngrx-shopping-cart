import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Report } from 'src/app/model';
import { AppState } from '../../store';
import { ReportsService } from '../services/reports.service';
import * as fromRouteActions from '../../store/actions/router.actions';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  reports$: Observable<Report[]>;
  constructor(
    private reportService: ReportsService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.reports$ = this.reportService.getReports();
  }

  onClick(report: Report): void {
    // TODO router step12
    // dispatch go
    // this.router.navigate(['/member/report', report.id]);
    this.store.dispatch(
      fromRouteActions.go({
        route: { path: ['/member/report'], query: { rptId: report.id } }
      })
    );
  }
}
