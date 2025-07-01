module.exports = {
  name: 'host-app',
  remotes: {
    authMfe: 'authMfe@http://localhost:4201/remoteEntry.js',
    detailsMfe: 'detailsMfe@http://localhost:4202/remoteEntry.js',
  }
};
