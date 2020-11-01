import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Report } from 'src/app/model';
import { AppConfig } from 'src/app/share';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  reports$: BehaviorSubject<Report[]>;
  constructor(
    private appConfig: AppConfig,
    private http: HttpClient
  ) {
    this.reports$ = new BehaviorSubject([]);
    this._getReports();
  }
  // get report from server
  getReportsFromServer(): Observable<Response> {
    return this.http.get<Response>(this.appConfig.apiUrl + '/reports');
  }
  _getReports(): void {
    this.getReportsFromServer()
      .subscribe((res: any) => {
        if (res.ok) {
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
}
