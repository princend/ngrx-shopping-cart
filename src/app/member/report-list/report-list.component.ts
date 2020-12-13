import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from 'src/app/model';
import { AppState } from '../../store/index';
import { Store } from '@ngrx/store';
import { go } from '../../store/actions/router.actions';
import * as fromReport from '../../store/actions/report.actions'
import { ReportEntityService } from 'src/app/services/report-entity.service';
@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportListComponent implements OnInit {

  reports$: Observable<Report[]>;
  reportID;
  constructor(
    private store: Store<AppState>,
    private reportEntityService: ReportEntityService
  ) {
    this.reports$ = this.reportEntityService.entities$;
  }

  ngOnInit(): void {
    this.getReports();
  }

  onClick(report: Report): void {
    this.store.dispatch(go({ payload: { path: ['/member/report', report.id] } }));
  }

  add() {
    const report: Report = { id: this.reportID, master: 'a', image: 'https://picsum.photos/300/150', title: `this is ${this.reportID}`, report: '測試測試測試' }
    // this.store.dispatch(fromReport.addReport({ report: report }))
    this.reportEntityService.add(report)
  }

  delete() {
    this.store.dispatch(fromReport.deleteReport({ id: this.reportID }))
  }


  getReports() {
    this.reportEntityService.getAll();
  }

}
