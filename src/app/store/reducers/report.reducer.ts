import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Report } from 'src/app/model';
import * as fromReportAction from '../actions/report.actions';

export const reportFeatureKey = 'report';

export interface ReportState {
  reports: Report[];
}

export const initialState: ReportState = {
  reports: []
};


export interface ReportStateEntity extends EntityState<ReportState> {
  selectedUserId: string | null;
}


export const adapter: EntityAdapter<ReportState> = createEntityAdapter<ReportState>({ selectId: a => 'reports' });


const defaultUser = {
  ids: [],
  entities: {
    user: { ...initialState }
  }
};

export const initialStateWithAdapter: ReportStateEntity = adapter.getInitialState({ ...defaultUser, selectedUserId: 'reports' });






export const reducer = createReducer(
  initialState,
  on(fromReportAction.getReportAction, (state) => ({ ...state })),
  on(fromReportAction.getReportSuccessAction, (state, action) => ({ ...state, reports: action.payload })),
  on(fromReportAction.getReportFailAction, (state) => ({ ...state })),
  on(fromReportAction.resetPeportAction, (state) => ({ ...initialState })),
);

