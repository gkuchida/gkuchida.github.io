import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { App } from './app/app';
import { Home } from './app/home/home';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Prontas } from './app/prontas/prontas';
import { Carrinho } from './app/carrinho/carrinho';
import { Encomenda } from './app/encomenda/encomenda';
import { Medidas } from './app/medidas/medidas';
import { Confirmar } from './app/confirmar/confirmar';
import { Tecidos } from './app/tecidos/tecidos';
import { Artesanato } from './app/artesanato/artesanato';
import { Sobre } from './app/sobre/sobre';
import { Duvidas } from './app/duvidas/duvidas';
import { Contato } from './app/contato/contato';
import { Buscar } from './app/buscar/buscar';
import { ProdutoDetalhes } from './app/produto-detalhes/produto-detalhes';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'prontas', component: Prontas },
  { path: 'carrinho', component: Carrinho },
  { path: 'encomenda', component: Encomenda },
  { path: 'medidas', component: Medidas },
  { path: 'confirmar', component: Confirmar },
  { path: 'tecidos', component: Tecidos },
  { path: 'artesanato', component: Artesanato },
  { path: 'sobre', component: Sobre },
  { path: 'duvidas', component: Duvidas },
  { path: 'contato', component: Contato },
  { path: 'buscar', component: Buscar },
  { path: 'pronta', component: Prontas },
  { path: 'encomenda/:nome', component: Encomenda },
  { path: 'artesanato/:nome', component: Artesanato },
  { path: 'produto-detalhes/:nome', component: ProdutoDetalhes },

];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)  // Aqui você configura o roteamento globalmente
  ]
})
.catch(err => console.error(err));
