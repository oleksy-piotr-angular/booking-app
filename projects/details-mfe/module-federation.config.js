module.exports = {
  name: 'detailsMfe',
  library: { type: 'module' },
  filename: 'remoteEntry.js',
  exposes: { './DetailsRoutes': './projects/details-mfe/src/app/details.routes.ts' }
};