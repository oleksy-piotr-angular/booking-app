module.exports = {
  name: 'host-app',
  remotes: {
    authMfe: 'authMfe@http://localhost:4201/authRemoteEntry.js',
    detailsMfe: 'detailsMfe@http://localhost:4202/detailsRemoteEntry.js',
    searchMfe: 'searchMfe@http://localhost:4203/searchRemoteEntry.js',
  }
};
