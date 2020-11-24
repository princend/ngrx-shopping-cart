import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Report } from 'src/app/model';
import { AppState } from 'src/app/store';
import { selectReportDetail } from 'src/app/store/selectors/report.selectors';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  // TODO report step17
  // changeDetection
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent implements OnInit {

  report$: Observable<Report>;
  constructor(
    private reportService: ReportsService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    // TODO report step16
    // select selectReport
    const id = this.route.snapshot.paramMap.get('rptId');
    // this.report$ = this.reportService.getReport(+id);
    this.report$ = this.store.select(selectReportDetail, { id: +id });
  }
}
