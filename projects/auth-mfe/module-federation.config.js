module.exports = {
  name: 'auth-mfe',
  library: { type: 'module' },
  filename: 'remoteEntry.js',
  exposes: { './AuthRoutes': './projects/auth-mfe/src/app/auth.routes.ts' }
};