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
);

