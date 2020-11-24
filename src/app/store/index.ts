import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './reducers/user.reducer';
// import * as fromRouter from './reducers/router.reducer';
// import * as fromReport from './reducers/report.reducer';


export interface AppState {
  [fromUser.userFeatureKey]: fromUser.UsersState;
  // TODO router step8
  // add router state
}

export const reducers: ActionReducerMap<AppState> = {
  [fromUser.userFeatureKey]: fromUser.reducer,
  // TODO router step9
  // add router reducer

};
