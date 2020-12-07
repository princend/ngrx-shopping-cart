
import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './reducers/user.reducer';
import * as fromRouter from './reducers/router.reducer';
import * as fromReport from './reducers/report.reducer';
export interface AppState {
  [fromUser.userFeatureKey]: fromUser.UserState;
  [fromRouter.routerFeatureKey]: fromRouter.RouterState;
  [fromReport.reportFeatureKey]: fromReport.ReportState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromRouter.routerFeatureKey]: fromRouter.reduder,
  [fromReport.reportFeatureKey]: fromReport.reducer
};
