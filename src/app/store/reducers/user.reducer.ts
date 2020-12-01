
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, State } from '@ngrx/store';
import * as fromUser from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface UserForEntity {
  isLogin: boolean;
  currentUser: string;
}

export const initialState: UserForEntity = {
  isLogin: false,
  currentUser: ''
};


export interface UserState extends EntityState<UserForEntity> {
  selectedUserId: string | null;
}

// 登入只會有一個使用者
export const adapter: EntityAdapter<UserForEntity> = createEntityAdapter<UserForEntity>({ selectId: a => 'user' });


const defaultUser = {
  ids: ['user'],
  entities: {
    user: { ...initialState }
  }
};

export const initialStateWithAdapter: UserState = adapter.getInitialState({ ...defaultUser, selectedUserId: 'user' });


export const reducer = createReducer(
  initialStateWithAdapter,
  on(fromUser.logout, () => {
    return { ...initialStateWithAdapter };
  }),
  on(fromUser.loginSuccess, (state, action) => {
    return { ...state, currentUser: action.payload, isLogin: true };
  }),
  on(fromUser.getUserSuccess, (state, action) => {
    return { ...state, entities: { user: { isLogin: true, currentUser: action.payload } } };
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
  on(fromUser.setUser, (state, action) => {
    return adapter.setOne(action.user, state);
  }),
  on(fromUser.updateUser, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
);


export const getSelectedUserId = (state: UserState) => state.selectedUserId;

export const selectIds = adapter.getSelectors().selectIds;
export const selectEntities = adapter.getSelectors().selectEntities;
export const selectAll = adapter.getSelectors().selectAll;
export const selectTotal = adapter.getSelectors().selectTotal;
