
import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './reducers/user.reducer';

export interface AppState {
    [fromUser.userFeatureKey]: fromUser.UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
    [fromUser.userFeatureKey]: fromUser.reducer,
};
