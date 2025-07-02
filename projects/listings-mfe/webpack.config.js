const { withModuleFederationPlugin, shareAll } = require('@angular-architects/module-federation/webpack');
const mfConfig = require('./module-federation.config.js'); // <- must be here!

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
  config => {
    config.experiments = { ...(config.experiments || {}), outputModule: true };
    config.output = { ...config.output, module: true, scriptType: 'module' };
    return config;
  }
);
