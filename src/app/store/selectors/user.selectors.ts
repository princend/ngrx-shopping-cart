import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from '../reducers/user.reducer';
import { userFeatureKey } from '../reducers/user.reducer';

export const getIsLogin = (state: fromReducer.UserForEntity) => state.isLogin;
export const getCurrentUser = (state: fromReducer.UserForEntity) => state.currentUser;
export const selectUserState = createFeatureSelector<fromReducer.UserState>(userFeatureKey);

export const selectUserIds = createSelector(selectUserState, fromReducer.selectIds);
export const selectUserEntities = createSelector(selectUserState, fromReducer.selectEntities);

export const selectCurrentUserId = createSelector(
  selectUserState,
  fromReducer.getSelectedUserId
);

export const selectCurrentUserfromEntities = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userEntities[userId]
);


