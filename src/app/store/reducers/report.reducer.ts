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
  on(fromReportAction.getReportAction, (state) => ({ ...state })),
  on(fromReportAction.getReportSuccessAction, (state, action) => ({ ...state, reports: action.payload })),
  on(fromReportAction.getReportFailAction, (state) => ({ ...state })),
  on(fromReportAction.resetPeportAction, (state) => ({ ...initialState })),
);

