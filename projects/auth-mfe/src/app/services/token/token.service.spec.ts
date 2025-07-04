import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve a token', () => {
    service.setToken('abc123');
    expect(service.getToken()).toBe('abc123');
  });

  it('should clear the token', () => {
    service.setToken('to-remove');
    service.clearToken();
    expect(service.getToken()).toBeNull();
  });

  it('should clear and return null if token is expired', () => {
    const expiredPayload = { exp: Math.floor(Date.now() / 1000) - 100 };
    const expiredToken = `header.${btoa(JSON.stringify(expiredPayload))}.sig`;

    localStorage.setItem('auth.token', expiredToken);

    const result = service.getToken();

    expect(result).toBeNull();
    expect(localStorage.getItem('auth.token')).toBeNull(); // ensures it's cleared
  });
});
