const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'host-app',
  
  remotes: {
    "authMfe": "http://localhost:4201/remoteEntry.js",    
  },

  experiments: { outputModule: true },
  output: {
    module: true,
    scriptType: 'module'
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
