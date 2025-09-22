
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5332, hash: '389d4a29055e6b44c3a3246b16c14ba69c0c9f7d4cafd1f2a1aec866f9ea8734', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1273, hash: 'c6b7eb0752b43d35be9705764e6509bb80a25e0bc64291e18967efe537a5299d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 23023, hash: '68fb7a00e51b0b3f31dcbb4195984b9cfd3f5e8b11329a7cd8ab73e5752beb33', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6HU5WNV3.css': {size: 231057, hash: 'gKdmrk2z3Qw', text: () => import('./assets-chunks/styles-6HU5WNV3_css.mjs').then(m => m.default)}
  },
};
