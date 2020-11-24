import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Report } from 'src/app/model';
import { AppState } from 'src/app/store';
import { go } from 'src/app/store/actions/router.actions';
import { selectReportList } from 'src/app/store/selectors/report.selectors';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  // TODO report step15
  // changeDection
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportListComponent implements OnInit {

  reports$: Observable<Report[]>;
  constructor(
    private reportService: ReportsService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // TODO report step14
    // select selectReposts
    // this.reports$ = this.reportService.getReports();
    this.reports$ = this.store.select(selectReportList);
  }

  onClick(report: Report): void {
    this.store.dispatch(go({ payload: { path: ['/member/report', report.id] } }));
  }
}
