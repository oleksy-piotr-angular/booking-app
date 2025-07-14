export interface ITokenService {
  getToken(): string | null;
  setToken(token: string): void;
  clearToken(): void;
}
