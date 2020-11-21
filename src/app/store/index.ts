import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './reducers/user.reducer';
// import * as fromRouter from './reducers/router.reducer';
// import * as fromReport from './reducers/report.reducer';


export interface AppState {
  [fromUser.userFeatureKey]: fromUser.UsersState;
  // TODO router step18
  // add router state

  // TODO report step32
  // add report state
}

export const reducers: ActionReducerMap<AppState> = {
  [fromUser.userFeatureKey]: fromUser.reducer,
  // TODO router step19
  // add router reducer

  // TODO report step33
  // add report reducer
};
