module.exports = {
  name: 'auth-mfe',
  library: { type: 'module' },
  filename: 'authRemoteEntry.js',
  exposes: {
    './RemoteEntryModule':
      './projects/auth-mfe/src/app/remote-entry/remote-entry.module.ts'
  }
};
