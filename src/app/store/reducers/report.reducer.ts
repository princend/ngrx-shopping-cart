import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Report } from 'src/app/model';
import * as fromReportAction from '../actions/report.actions';

export const reportFeatureKey = 'report';
export interface ReportState extends EntityState<Report> {
}

export function sortByTitle(a: Report, b: Report): number {
  return a.title.localeCompare(b.title);
}

export const adapter: EntityAdapter<Report> = createEntityAdapter<Report>({
  selectId: (report: Report) => report.id,
  sortComparer: sortByTitle
});

export const initialStateWithAdapter: ReportState = adapter.getInitialState();

export const reducer = createReducer(
  initialStateWithAdapter,
  on(fromReportAction.getReportAction, (state) => ({ ...state })),
  on(fromReportAction.getReportFailAction, (state) => ({ ...state })),
  on(fromReportAction.resetPeportAction, (state) => ({ ...state })),
  on(fromReportAction.addReports, (state, { reports }) => {
    return adapter.addMany(reports, state);
  }),

  on(fromReportAction.addReport, (state, { report }) => {
    return adapter.addOne(report, state);
  }),
  on(fromReportAction.deleteReport, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
);

export const selectIds = adapter.getSelectors().selectIds;
export const selectEntities = adapter.getSelectors().selectEntities;
export const selectReportAll = adapter.getSelectors().selectAll;
