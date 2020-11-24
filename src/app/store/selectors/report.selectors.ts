import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../';
import { reportFeatureKey, ReportState } from '../reducers/report.reducer';

import * as fromReducer from '../reducers/report.reducer';
export const getReport = (state: fromReducer.ReportState) => state.reports;
export const getReportDetail = (state: fromReducer.ReportState, props: { id: any }) =>
  state.reports.find(r => r.id === props.id);

// TODO report step11
// getReportState from AppState
export const getReportState = createFeatureSelector<AppState, ReportState>(reportFeatureKey);

// TODO report step12
// create selector ,select state.reports
export const selectReportList = createSelector(getReportState, getReport);

// TODO report step13
// create selector ,select reportDetail
// router state to get router params
export const selectReportDetail = createSelector(getReportState, getReportDetail);
