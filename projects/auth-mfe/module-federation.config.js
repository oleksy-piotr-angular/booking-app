module.exports = {
  name: 'auth-mfe',
  library: { type: 'module' },
  filename: 'authRemoteEntry.js',
  exposes: { 
    './AuthRoutes': './projects/auth-mfe/src/app/auth.routes.ts',
    './AuthService': './projects/auth-mfe/src/app/services/auth/auth.service.ts',
    './TokenService': './projects/auth-mfe/src/app/services/token/token.service.ts',
    './AuthInterceptor': './projects/auth-mfe/src/app/interceptors/auth.interceptor.ts',
  } 
};
