module.exports = {
  name: 'host-app',
  remotes: {
    authMfe: 'auth-mfe@http://localhost:4201/remoteEntry.js',
    detailsMfe: 'details-mfe@http://localhost:4202/remoteEntry.js',
  }
};
