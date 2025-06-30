module.exports = {
  name: 'auth-mfe',
  filename: 'remoteEntry.js',
  exposes: {
    './AuthRoutes': './projects/auth-mfe/src/app/auth.routes.ts'
  }
};
