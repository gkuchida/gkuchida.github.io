
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
    'index.csr.html': {size: 34727, hash: '6386e0642a29296e9c7f9d6eed805b29ebf9e253bd694bfb22ec64e4f4897756', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 22734, hash: '7777c00982678791574cdb7340a7395fa957126a73caab8024335e04f844d045', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 54695, hash: 'e8c13057367e6347a3f8e2dbe7b188b8054a75504b3b69d78999c00292075519', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-KOJOEABB.css': {size: 239156, hash: 'TYPNsJIYpHY', text: () => import('./assets-chunks/styles-KOJOEABB_css.mjs').then(m => m.default)}
  },
};
