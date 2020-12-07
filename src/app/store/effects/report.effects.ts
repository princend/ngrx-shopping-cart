import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { getReportAction, getReportFailAction } from '../actions/report.actions';
import { ReportsService } from '../../member/services/reports.service';
import { of } from 'rxjs';
import { Report } from 'src/app/model';
import * as fromReportActions from '../actions/report.actions';


@Injectable()
export class ReportEffects {
  constructor(private actions$: Actions, private reportsService: ReportsService) { }
  getReportEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromReportActions.getReportAction),
      switchMap(() => {
        return this.reportsService.getReportsFromServer().pipe(
          map((res: Response & ReportResponse) => {
            if (res.success) {
              return fromReportActions.addReports({ reports: res.payload });
            }
            else {
              return getReportFailAction({ payload: res.payload });
            }
          }),
          catchError(err => of(getReportFailAction({ payload: err })))
        );
      }));
  });
}

export interface ReportResponse {
  success: boolean;
  payload: Report[];
}
