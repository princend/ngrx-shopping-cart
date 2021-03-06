import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Report } from 'src/app/model';
import { AppConfig } from 'src/app/share';
import { UtilsService } from '../../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  reports$: BehaviorSubject<Report[]>;
  constructor(
    private appConfig: AppConfig,
    private http: HttpClient,
    private utils: UtilsService
  ) {
    this.reports$ = new BehaviorSubject([]);
    this._getReports();
  }
  // get report from server
  getReportsFromServer(): Observable<Response> {
    const token = this.utils.getToken();
    return this.http.get<Response>(this.appConfig.apiUrl + '/reports', { headers: { Authorization: `Bearer ${token}` } });
  }
  _getReports(): void {
    this.getReportsFromServer()
      .subscribe((res: any) => {
        if (res.success) {
          this.reports$.next(res.payload);
        } else {
          console.log('server side error');
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('client-side error');
        } else {
          console.log('server-side error');
        }
      });
  }

  getReports(): Observable<Report[]> {
    return this.reports$;
  }

  getReport(id: number): Observable<Report> {
    return this.reports$.pipe(
      map(reports => {
        return reports.filter(report => report.id === id)[0];
      })
    );
  }
}
