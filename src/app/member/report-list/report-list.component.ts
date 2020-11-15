import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Report } from 'src/app/model';
import { ReportsService } from '../services/reports.service';
import { AppState } from '../../store/index';
import { Store } from '@ngrx/store';
import { selectReposts } from '../../store/selectors/report.selectors';
import { go } from '../../store/actions/router.actions';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportListComponent implements OnInit {

  reports$: Observable<Report[]>;
  constructor(
    private reportService: ReportsService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // this.reports$ = this.reportService.getReports();

    // this.reports$.subscribe(e => {
    //   console.log(e, 'sub');
    // });

    this.reports$ = this.store.select(selectReposts);
  }

  onClick(report: Report): void {
    // this.router.navigate(['/member/report', report.id]);
    this.store.dispatch(go({ payload: { path: ['/member/report', report.id] } }));
  }
}
