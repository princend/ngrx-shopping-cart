import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './reducers/user.reducer';
import * as fromRouter from './reducers/router.reducer';
import * as fromReport from './reducers/report.reducer';

export interface AppState {
  [fromUser.userFeatureKey]: fromUser.UsersState;
  [fromRouter.routerFeatureKey]: fromRouter.RouterState;

  // TODO report step9
  // add report state
  [fromReport.reportFeatureKey]: fromReport.ReportState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromRouter.routerFeatureKey]: fromRouter.reducer,

  // TODO report step10
  // add report reducer
  [fromReport.reportFeatureKey]: fromReport.reducer,
};
