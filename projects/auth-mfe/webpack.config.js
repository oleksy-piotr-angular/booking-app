const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const mfConfig = require('./module-federation.config');

module.exports = withModuleFederationPlugin({

  ...mfConfig,
  // This is needed for Angular 17+ to support module federation with ES modules
  experiments: { outputModule: true },
  output: {
    module: true,
    scriptType: 'module'
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
