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
});
