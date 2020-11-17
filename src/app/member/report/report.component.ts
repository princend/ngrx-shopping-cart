import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from 'src/app/model';
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
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.report$ = this.store.select(selectReport);
  }
}
