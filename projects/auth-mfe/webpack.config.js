
const {
  withModuleFederationPlugin,
  shareAll
} = require('@angular-architects/module-federation/webpack');

const mfConfig = require('./module-federation.config.js');

module.exports = withModuleFederationPlugin(
  {
    ...mfConfig,
    shared: {
      ...shareAll({
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto'
      })
    }
  },

  //factory to tweak the full Webpack config
  (config) => {
    // enable real ES-module output
    config.experiments = {
      ...(config.experiments || {}),
      outputModule: true
    };

    // tell the HTML that this script is an ES module
    config.output = {
      ...config.output,
      module: true,
      scriptType: 'module'
    };

    return config;
  }
);
