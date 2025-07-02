module.exports = {
  name: 'listingsMfe',
  library: { type: 'module' },
  filename: 'listingsRemoteEntry.js',
  exposes: {
    './ListingsRoutes': './projects/listings-mfe/src/app/listings.routes.ts'
  }
};
