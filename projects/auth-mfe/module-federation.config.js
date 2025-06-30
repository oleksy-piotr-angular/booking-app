module.exports = {
  name: 'auth-mfe',
  library: { type: 'module' },
  filename: 'remoteEntry.js',
  exposes: { './AuthRoutes': './src/app/auth.routes.ts' }
};