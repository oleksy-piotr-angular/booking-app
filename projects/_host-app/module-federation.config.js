module.exports = {
  name: 'host-app',
  remotes: {
    'auth-mfe': 'auth-mfe@http://localhost:4201/authRemoteEntry.js',
    'details-mfe': 'details-mfe@http://localhost:4202/detailsRemoteEntry.js',
    'search-mfe': 'search-mfe@http://localhost:4203/searchRemoteEntry.js',
    'listings-mfe': 'listings-mfe@http://localhost:4204/listingsRemoteEntry.js',
  }
};
