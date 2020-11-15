import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '..';
import * as fromReducer from '../reducers/user.reducer'
import { userFeatureKey, UsersState } from '../reducers/user.reducer';

export const getIsLogin = (state: fromReducer.UsersState) => state.isLogin;
export const getCurrentUser = (state: fromReducer.UsersState) => state.currentUser;


// export const getUserState = (state: AppState) => state.user;
export const getUserState = createFeatureSelector<AppState, UsersState>(userFeatureKey);

export const selectIsLogin = createSelector(getUserState, getIsLogin);

export const selectCurrentUser = createSelector(getUserState, getCurrentUser);
