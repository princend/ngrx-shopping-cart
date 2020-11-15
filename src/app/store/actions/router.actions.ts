import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export const go = createAction(
  '[router] go',
  props<{ payload: Route }>()
);

export const back = createAction(
  '[Router] back',

);

export const forward = createAction(
  '[Router] forward'
);


export interface Route {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}
