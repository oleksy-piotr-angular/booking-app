module.exports = {
  name: 'listings-mfe',
  library: { type: 'module' },
  filename: 'listingsRemoteEntry.js',
  exposes: {
    './ListingsRoutes': './projects/listings-mfe/src/app/listings.routes.ts'
  }
};
