import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Report } from 'src/app/model';
import { ReportsService } from '../services/reports.service';
import { AppState } from '../../store/index';
import { Store } from '@ngrx/store';
import { selectReport } from 'src/app/store/selectors/report.selectors';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent implements OnInit {

  report$: Observable<Report>;
  constructor(
    // private reportService: ReportsService,
    // private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('rptId');
    // this.report$ = this.reportService.getReport(+id);
    this.report$ = this.store.select(selectReport);
  }
}
