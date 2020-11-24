import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ReportsService } from 'src/app/member/services/reports.service';
import { Report } from 'src/app/model';
import * as fromReportActions from '../actions/report.actions';
import { getReportFailAction, getReportSuccessAction } from '../actions/report.actions';



@Injectable()
export class ReportEffects {
  constructor(private actions$: Actions, private reportsService: ReportsService) { }

  getReportEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromReportActions.getReportAction),
      switchMap(() => {
        return this.reportsService.getReportsFromServer().pipe(
          map((res: Response & ReportResponse) => {
            // TODO report step7
            // if res.success return getReportSuccessAction
            // else return getReportFailAction
            // }),
            if (res.success) {
              return getReportSuccessAction({ payload: res.payload });
            } else {
              return getReportFailAction({ payload: res.payload });
            }
          }),
          // TODO report step8
          // catchError return getReportFailAction

          catchError(error => of(getReportFailAction({ payload: error.payload })))
        );
      }));
  });
}

export interface ReportResponse {
  success: boolean;
  payload: Report[];
}
