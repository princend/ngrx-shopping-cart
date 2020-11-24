import { createAction, props } from '@ngrx/store';
import { Report } from 'src/app/model/report';

// TODO report step1
// create "[report] getReport" Action
export const getReportAction = createAction('[report] getReport');

// TODO report step2
// create "[report] getReport Success" Action, payload is {payload:Report[]}
export const getReportSuccessAction = createAction(
  '[report] getReport Success',
  props<{ payload: Report[] }>()
);

// TODO report step3
// create "[report] getReport Fail" Action, payload is {payload:any}
export const getReportFailAction = createAction(
  '[report] getReport Fail',
  props<{ payload: any }>()
);

