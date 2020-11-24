import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot
} from '@angular/router';
import {
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';
import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';

export const routerFeatureKey = 'router';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export type RouterState = RouterReducerState<RouterStateUrl>;

export const reducer = routerReducer;

export class CustomeSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    // TODO router step4
    // override serialize
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;

    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;
    return { url, params, queryParams };
  }
}

export const getRouterState = createFeatureSelector<RouterState>('router');
