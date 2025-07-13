// projects/_host-app/src/main.ts
import './polyfills';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { RemoteEntry, REMOTES } from './app/remotes';

// optional: setup zone-friendly federation globals
declare const __webpack_init_sharing__: any;
declare const __webpack_share_scopes__: any;

async function loadRemote(r: RemoteEntry): Promise<void> {
  await __webpack_init_sharing__('default');

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = r.remoteEntry;
    script.type = 'module';
    script.onload = () => resolve();
    script.onerror = () => reject(`Failed to load ${r.remoteName}`);
    document.head.appendChild(script);
  });
  const container = (window as any)[r.remoteName];
  await container.init(__webpack_share_scopes__.default);
}

(async () => {
  // inject all remotes
  // Load all remoteEntry.js scripts in parallel
  await Promise.all(REMOTES.map(loadRemote));

  // now its safe to bootstrap Angular
  // and the remotes are ready to be used
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
})();
