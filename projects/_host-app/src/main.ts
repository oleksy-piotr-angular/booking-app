// projects/_host-app/src/main.ts
import { REMOTES } from './app/remotes';
import './polyfills';

declare const __webpack_init_sharing__: (scope: string) => Promise<void>;
declare const __webpack_share_scopes__: { [scope: string]: any };

async function loadAllRemotes() {
  // 1) Init the shared scope
  await __webpack_init_sharing__('default');

  // 2) Dynamically import each remoteEntry as an ES module
  await Promise.all(
    REMOTES.map(async ({ remoteEntry }) => {
      // Tell webpack to leave this URL alone at build time
      const container = await import(/* webpackIgnore: true */ remoteEntry);

      // 3) Init that remote’s share‐scope
      await container.init(__webpack_share_scopes__['default']);
    })
  );
}

(async () => {
  // Load + init all remotes first
  await loadAllRemotes();

  // Then dynamically bring in Angular and your shell parts
  const [{ bootstrapApplication }, { AppComponent }, { appConfig }] =
    await Promise.all([
      import('@angular/platform-browser'),
      import('./app/app.component'),
      import('./app/app.config'),
    ]);

  // Finally bootstrap your shell
  bootstrapApplication(AppComponent, appConfig).catch(console.error);
})();
