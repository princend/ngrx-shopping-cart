import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';


// TODO router step11
// create "[router] go" Action, payload is {payload:Route}
export const sampleAction = createAction(
  '[source] event',
  props<{ data: any }>()
);

// TODO router step12
// create "[router] back" Action

// TODO router step13
// create "[router] forward" Action


export interface Route {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}
