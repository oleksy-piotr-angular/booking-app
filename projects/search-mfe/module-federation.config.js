module.exports = {
  name: 'searchMfe',
  library: { type: 'module' },
  // custom filename:
  filename: 'searchRemoteEntry.js',
  exposes: {
    './SearchRoutes': './projects/search-mfe/src/app/search.routes.ts',
  },
};
// This configuration file sets up the module federation for the search microfrontend (MFE).
