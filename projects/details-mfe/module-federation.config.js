module.exports = {
  name: 'details-mfe',
  library: { type: 'module' },
  filename: 'detailsRemoteEntry.js',
  exposes: { './DetailsRoutes': './projects/details-mfe/src/app/details.routes.ts' }
};