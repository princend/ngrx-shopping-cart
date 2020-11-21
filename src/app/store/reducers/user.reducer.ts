import { Action, createReducer, on } from '@ngrx/store';


import * as fromUser from '../actions/user.actions';


export const userFeatureKey = 'user';


export interface UsersState {
  isLogin: boolean;
  currentUser: string;
}

export const initialState: UsersState = {
  isLogin: false,
  currentUser: ''
};


export const reducer = createReducer(
  initialState,
  on(fromUser.logout, () => {
    return { ...initialState };
  }),
  on(fromUser.loginSuccess, (state, action) => {
    return { ...state, currentUser: action.payload, isLogin: true };
  }),
  on(fromUser.getUserSuccess, (state, action) => {
    return { ...state, currentUser: action.payload, isLogin: true };
  }),
  on(fromUser.login, (state) => {
    return { ...state };
  }),
  on(fromUser.loginFail, (state) => {
    return { ...state };
  }),
  on(fromUser.logoutSuccess, (state) => {
    return { ...state };
  }),
  on(fromUser.logoutFail, (state) => {
    return { ...state };
  }),
  on(fromUser.getUser, (state) => {
    return { ...state };
  }),
  on(fromUser.getUserFail, (state) => {
    return { ...state };
  }),

);

