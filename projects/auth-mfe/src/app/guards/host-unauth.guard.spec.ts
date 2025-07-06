import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { of, isObservable, from, Observable } from 'rxjs';

import { unauthGuard } from './host-unauth.guard';
import { AuthService } from '../../app/services/auth/auth.service';

describe('unauthGuard (TDD)', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let authStub: { isAuthenticated$: Observable<boolean> };

  function runGuard(): Observable<boolean | UrlTree> {
    const fakeRoute = {} as ActivatedRouteSnapshot;
    const fakeState = {} as RouterStateSnapshot;
    const result = TestBed.runInInjectionContext(() =>
      unauthGuard(fakeRoute, fakeState)
    );
    if (isObservable(result)) return result;
    if (result instanceof Promise) return from(result);
    return of(result as boolean | UrlTree);
  }

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);
    authStub = { isAuthenticated$: of(false) };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authStub },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('should allow if NOT authenticated', fakeAsync(() => {
    let outcome: boolean | UrlTree | undefined;
    runGuard().subscribe((r) => (outcome = r));
    tick();
    expect(outcome).toBe(true);
  }));

  it('should redirect to "/" when already authenticated', fakeAsync(() => {
    // re-stub to emit true
    TestBed.resetTestingModule();
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);
    authStub = { isAuthenticated$: of(true) };
    const tree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(tree);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authStub },
        { provide: Router, useValue: routerSpy },
      ],
    });

    let outcome: boolean | UrlTree | undefined;
    runGuard().subscribe((r) => (outcome = r));
    tick();

    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/']);
    expect(outcome).toBe(tree);
  }));
});
