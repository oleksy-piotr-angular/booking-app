import {
  CanActivateFn,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export const unauthGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  return new Observable<boolean>((subscriber) => {
    subscriber.next(true);
  });
};
