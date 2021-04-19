import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Report } from 'src/app/model';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  reports$: Observable<Report[]>;
  constructor(
    private reportService: ReportsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reports$ = this.reportService.getReports();
  }


  // test222
  onClick(report: Report): void {
    this.router.navigate(['/member/report', report.id]);
  }

}
