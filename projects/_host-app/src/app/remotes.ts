export interface RemoteEntry {
  remoteName: string; // e.g. 'auth-mfe'
  remoteEntry: string; // URL to its remoteEntry.js
}

export const REMOTES: RemoteEntry[] = [
  {
    remoteName: 'auth-mfe',
    remoteEntry: 'http://localhost:4201/authRemoteEntry.js',
  },
  {
    remoteName: 'details-mfe',
    remoteEntry: 'http://localhost:4202/detailsRemoteEntry.js',
  },
  {
    remoteName: 'search-mfe',
    remoteEntry: 'http://localhost:4203/searchRemoteEntry.js',
  },
  {
    remoteName: 'listings-mfe',
    remoteEntry: 'http://localhost:4204/listingsRemoteEntry.js',
  },
];
