const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const mfConfig = require('./module-federation.config.js');

module.exports = withModuleFederationPlugin({

  ...mfConfig,

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
