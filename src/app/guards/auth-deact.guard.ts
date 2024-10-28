import { CanDeactivateFn } from '@angular/router';

export const authDeactGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
