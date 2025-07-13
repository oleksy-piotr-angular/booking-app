// projects/_host-app/webpack.config.js
const {
  withModuleFederationPlugin,
  shareAll
} = require('@angular-architects/module-federation/webpack');
const mfConfig = require('./module-federation.config.js');

module.exports = withModuleFederationPlugin(
  {
    ...mfConfig, // this is just { name: 'host-app' } now | [Dynamic Shell]
    shared: shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    })
  },
  config => {
    config.experiments = {
      ...(config.experiments || {}),
      outputModule: true
    };

    config.output = {
      ...config.output,
      module: true,
      scriptType: 'module'
    };

    return config;
  }
);