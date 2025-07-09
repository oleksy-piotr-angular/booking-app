// host-auth.guard.spec.ts
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, UrlTree, Route, UrlSegment } from '@angular/router';
import { of, isObservable, from, Observable } from 'rxjs';

import { hostAuthGuard } from './host-auth.guard';
import { AUTH_MFE_SERVICE } from '../tokens/auth.token';

describe('hostAuthGuard (unit)', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let fakeAuth: { isAuthenticated$: Observable<boolean> };

  function runGuard(): Observable<boolean | UrlTree> {
    const result = TestBed.runInInjectionContext(() =>
      hostAuthGuard({} as Route, [] as UrlSegment[])
    );
    if (isObservable(result)) return result;
    if (result instanceof Promise) return from(result);
    return of(result);
  }

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);
    fakeAuth = { isAuthenticated$: of(false) };

    TestBed.configureTestingModule({
      providers: [
        // bind our stub under the token your guard uses
        { provide: AUTH_MFE_SERVICE, useValue: fakeAuth },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('redirects when NOT authenticated', fakeAsync(() => {
    const loginTree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(loginTree);

    let outcome: boolean | UrlTree | undefined;
    runGuard().subscribe((r) => (outcome = r));
    tick();

    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/auth', 'login']);
    expect(outcome).toBe(loginTree);
  }));

  it('allows match when authenticated', fakeAsync(() => {
    // swap our stub to emit `true`
    TestBed.resetTestingModule();
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);
    fakeAuth = { isAuthenticated$: of(true) };

    TestBed.configureTestingModule({
      providers: [
        { provide: AUTH_MFE_SERVICE, useValue: fakeAuth },
        { provide: Router, useValue: routerSpy },
      ],
    });

    let outcome: boolean | UrlTree | undefined;
    runGuard().subscribe((r) => (outcome = r));
    tick();

    expect(outcome).toBe(true);
  }));
});
