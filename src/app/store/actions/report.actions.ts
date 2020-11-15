import { createAction, props } from '@ngrx/store';
import { Report } from '../../model/report';

export const getReportAction = createAction(
  '[Report] getReport'
);

export const getReportSuccessAction = createAction(
  '[Report] getReport Success',
  props<{ payload: Report[] }>()
);

export const getReportFailAction = createAction(
  '[Report] getReport Fail',
  props<{ payload: any }>()
);


export const resetPeportAction = createAction(
  '[Report] resetReport'
);
