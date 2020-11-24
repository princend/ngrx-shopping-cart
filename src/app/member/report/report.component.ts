import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Report } from 'src/app/model';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
  // TODO report step17
  // changeDetection
})
export class ReportComponent implements OnInit {

  report$: Observable<Report>;
  constructor(
    private reportService: ReportsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // TODO report step16
    // select selectReport
    const id = this.route.snapshot.paramMap.get('rptId');
    this.report$ = this.reportService.getReport(+id);
  }
}
