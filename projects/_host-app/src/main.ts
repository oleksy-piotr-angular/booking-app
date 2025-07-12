// main.ts
import './polyfills'; // Ensure polyfills are loaded first

import('./bootstrap').catch((err) => console.error(err));
