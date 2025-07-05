import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { of, isObservable, from, Observable } from 'rxjs';

import { authGuard } from './auth.guard';
import {
  createRouterSpy,
  provideMockAuthService,
  provideMockRouter,
} from '../../testing/test-helpers';

describe('authGuard (TDD)', () => {
  let routerSpy: jasmine.SpyObj<Router>;

  function runGuard(): Observable<boolean | UrlTree> {
    const result = TestBed.runInInjectionContext(() =>
      authGuard(null as any, null as any)
    );
    if (isObservable(result)) return result;
    if (result instanceof Promise) return from(result);
    return of(result);
  }

  beforeEach(() => {
    routerSpy = createRouterSpy();

    TestBed.configureTestingModule({
      providers: [provideMockAuthService(false), provideMockRouter(routerSpy)],
    });
  });

  it('redirects to /login when NOT authenticated', fakeAsync(() => {
    const loginTree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(loginTree);

    let result: boolean | UrlTree | undefined;
    runGuard().subscribe((res) => (result = res));
    tick();

    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(result).toBe(loginTree);
  }));

  it('allows activation when authenticated', fakeAsync(() => {
    TestBed.resetTestingModule();
    routerSpy = createRouterSpy();

    TestBed.configureTestingModule({
      providers: [provideMockAuthService(true), provideMockRouter(routerSpy)],
    });

    let result: boolean | UrlTree | undefined;
    runGuard().subscribe((res) => (result = res));
    tick();

    expect(result).toBe(true);
  }));
});
