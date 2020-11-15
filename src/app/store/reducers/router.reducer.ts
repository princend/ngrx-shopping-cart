import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';


export const routerFeatureKey = 'router';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}


export type RouterState = RouterReducerState<RouterStateUrl>;

export const reduder = routerReducer;

export class CustomeSerializer implements RouterStateSerializer<RouterStateUrl>{

  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;

    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;
    return { url, queryParams, params };
  }

}

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerReducer');

// export const initialState: State = {

// };

// export const reducer = createReducer(
//   initialState,

// );

