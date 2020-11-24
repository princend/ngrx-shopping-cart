import { Action, createReducer, on } from '@ngrx/store';
import { Report } from 'src/app/model';
import * as fromReportAction from '../actions/report.actions';

export const reportFeatureKey = 'report';

export interface ReportState {
  reports: Report[];
}

export const initialState: ReportState = {
  reports: []
};


export const reducer = createReducer(
  initialState,
  // TODO report step4
  // on getReportAction , return {...state}

  // TODO report step5
  // on getReportSuccessAction , return { ...state, reports: action.payload }

  // TODO report step6
  // on getReportFailAction , return {...state}
);

