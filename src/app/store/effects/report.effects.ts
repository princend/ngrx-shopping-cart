import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ReportsService } from 'src/app/member/services/reports.service';
import { Report } from 'src/app/model';
import * as fromReportActions from '../actions/report.actions';



@Injectable()
export class ReportEffects {
  constructor(private actions$: Actions, private reportsService: ReportsService) { }

  // getReportEffect$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     // ofType(fromReportActions.getReportAction),
  //     switchMap(() => {
  //       return this.reportsService.getReportsFromServer().pipe(
  //         // map((res: Response & ReportResponse) => {
  //         // TODO report step7
  //         // if res.success return getReportSuccessAction
  //         // else return getReportFailAction
  //         // }),

  //         // TODO report step8
  //         // catchError return getReportFailAction
  //       );
  //     }));
  // });
}

export interface ReportResponse {
  success: boolean;
  payload: Report[];
}
