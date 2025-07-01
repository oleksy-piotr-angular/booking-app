module.exports = {
  name: 'authMfe',
  library: { type: 'module' },
  filename: 'remoteEntry.js',
  exposes: { './AuthRoutes': './projects/auth-mfe/src/app/auth.routes.ts' }
};