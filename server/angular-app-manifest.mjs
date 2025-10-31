
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/artesfocinhos/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/artesfocinhos"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 34741, hash: '57ca3a5f59a325bb69f0148f13746d056dac51f9879892659eaf1baaf08ec27c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 22748, hash: 'abff289749da25b9f9898703a8566e6445ca02a0324b0f5d2b88c2bf53eab339', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 54834, hash: '7e27b4b804dfbeb0dba7285029ed9eacdb3bc6ecdde8f45e0b92235d6945665f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-KOJOEABB.css': {size: 239156, hash: 'TYPNsJIYpHY', text: () => import('./assets-chunks/styles-KOJOEABB_css.mjs').then(m => m.default)}
  },
};
