import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getRouterState } from '../reducers/router.reducer';
import { reportFeatureKey } from '../reducers/report.reducer';
import { Report } from 'src/app/model';
import * as fromReducer from '../reducers/report.reducer';

export const selectReportState = createFeatureSelector<fromReducer.ReportState>(reportFeatureKey);
export const selectReposts = createSelector(selectReportState, fromReducer.selectReportAll);
export const selectReport = createSelector(
  getRouterState, selectReposts,
  (router, reposts): Report => {
    return router.state && reposts.filter(report => report.id === +router.state.params.rptId)[0];
  }
);
