import { createSelector } from '@ngrx/store';
import { getRouterState } from '../reducers/router.reducer';
import { AppState } from '../index';
import { ReportState } from '../reducers/report.reducer';
import { Report } from 'src/app/model';

export const getReportState = (state: AppState) => state.report;

export const selectReposts = createSelector(
    getReportState,
    (state: ReportState) => state.reports
);

export const selectReport = createSelector(
    getRouterState, getReportState,
    (router, reportState): Report => {
        return router.state && reportState.reports.filter(report => report.id === +router.state.params.rptId)[0];
    }
);
