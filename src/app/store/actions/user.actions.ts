import { createAction, props } from '@ngrx/store';
import { User } from '../../model/user';

export const login = createAction(
  '[user] login',
  props<{ payload: User }>()
);

export const loginSuccess = createAction(
  '[user] loginSuccess',
  props<{ payload: string }>()
);

export const loginFail = createAction(
  '[user] loginFail',
  props<{ payload: any }>()
);

export const logout = createAction(
  '[user] logout',
);

export const logoutSuccess = createAction(
  '[user] logoutSuccess'
);

export const logoutFail = createAction(
  '[user] logoutFail'
);


export const getUser = createAction(
  '[user] getUser',
);

export const getUserSuccess = createAction(
  '[user] getUserSuccess',
  props<{ payload: string }>()
);

export const getUserFail = createAction(
  '[user] getUserFail',
  props<{ payload: any }>()
);
