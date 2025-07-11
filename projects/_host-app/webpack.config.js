// projects/_host-app/webpack.config.js
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
      }),
      //explicitly share the remote entry point(s)
      //so host and auth-mfe share the same AuthService instance
      'auth-mfe': {
        singleton: true,
        strictVersion: false, // or true if you publish with matching versions
        eager: false          // lazy‐load the remote
      },
      '@booking-app/auth-token': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
      },
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
