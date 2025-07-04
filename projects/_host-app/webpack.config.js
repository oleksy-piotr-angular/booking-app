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
  // second arg let mutate the full Webpack config
  (config) => {
    // emit as ES modules
    config.experiments = { ...(config.experiments || {}), outputModule: true };
    // tag scripts as modules
    config.output = { ...config.output, module: true, scriptType: 'module' };
    return config;
  }
);
