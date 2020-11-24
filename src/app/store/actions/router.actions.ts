import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';


// TODO router step1
// create "[router] go" Action, payload is {payload:Route}
export const sampleAction = createAction(
  '[source] event',
  props<{ data: any }>()
);

// TODO router step2
// create "[router] back" Action

// TODO router step3
// create "[router] forward" Action


export interface Route {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}
