import { createAction, props } from '@ngrx/store';
import { Report } from 'src/app/model';

export const getReportAction = createAction(
  '[Report] getReport'
);

// export const getReportSuccessAction = createAction(
//   '[Report] getReport Success',
//   props<{ payload: any }>()
// );

export const getReportFailAction = createAction(
  '[Report] getReport Fail',
  props<{ payload: any }>()
);


export const resetPeportAction = createAction(
  '[Report] resetReport'
);

export const addReport = createAction('[Report] addReport', props<{ report: Report }>());
export const deleteReport = createAction('[Report] deleteReport', props<{ id: string }>());


export const addReports = createAction('[User/API] Add reports', props<{ reports: Report[] }>());
