//As we are going with static federation, we also need typings for all
// configured paths (EcmaScript modules) referencing Micro Frontends:
declare module 'auth-mfe' {
  export class AuthService {
    isAuthenticated$: import('rxjs').Observable<boolean>;
    // Add other methods/properties as needed
  }
}
