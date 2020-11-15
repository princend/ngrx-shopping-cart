
import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './reducers/user.reducer';
import * as fromRouter from './reducers/router.reducer';
export interface AppState {
    [fromUser.userFeatureKey]: fromUser.UsersState;
    [fromRouter.routerFeatureKey]: fromRouter.RouterState;
}

export const reducers: ActionReducerMap<AppState> = {
    [fromUser.userFeatureKey]: fromUser.reducer,
    [fromRouter.routerFeatureKey]: fromRouter.reduder
};
