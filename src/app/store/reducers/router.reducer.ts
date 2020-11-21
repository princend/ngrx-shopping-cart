import { Params, RouterStateSnapshot } from '@angular/router';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { Action, createReducer, on } from '@ngrx/store';


export const routerFeatureKey = 'router';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export type RouterState = RouterReducerState<RouterStateUrl>;

export const reduder = routerReducer;

export class CustomeSerializer implements RouterStateSerializer<RouterStateUrl>{

  // serialize(routerState: RouterStateSnapshot): RouterStateUrl {
  // TODO router step14
  // override serialize
  // }
}


// export const getRouterState = createFeatureSelector<RouterState>('router');
