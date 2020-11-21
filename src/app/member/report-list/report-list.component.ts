import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Report } from 'src/app/model';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
  // TODO report step48
  // changeDection
})
export class ReportListComponent implements OnInit {

  reports$: Observable<Report[]>;
  constructor(
    private reportService: ReportsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // TODO report step47
    // select selectReposts
    this.reports$ = this.reportService.getReports();
  }

  onClick(report: Report): void {
    // TODO router step22
    // dispatch go
    this.router.navigate(['/member/report', report.id]);
  }
}
