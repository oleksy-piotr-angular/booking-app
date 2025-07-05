import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('TokenService (TDD)', () => {
  let service: TokenService;

  // a helper valid JWT with exp 1 hour in the future
  const futureExp = Math.floor(Date.now() / 1000) + 3600;
  const validToken = `header.${btoa(JSON.stringify({ exp: futureExp }))}.sig`;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve a simple token', () => {
    service.setToken('abc123');
    expect(service.getToken()).toBe('abc123');
  });

  it('should clear the token', () => {
    service.setToken('to-remove');
    service.clearToken();
    expect(service.getToken()).toBeNull();
  });

  it('should store and retrieve a valid (non-expired) JWT', () => {
    service.setToken(validToken);
    expect(service.getToken()).toBe(validToken);
  });

  it('should clear and return null if the JWT is expired', () => {
    const pastExp = Math.floor(Date.now() / 1000) - 100;
    const expiredToken = `header.${btoa(JSON.stringify({ exp: pastExp }))}.sig`;
    localStorage.setItem('auth.token', expiredToken);

    const result = service.getToken();
    expect(result).toBeNull();
    expect(localStorage.getItem('auth.token')).toBeNull();
  });
});
