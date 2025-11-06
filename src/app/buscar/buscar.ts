import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { prod_encomenda } from '../encomenda/encomenda';
import { artesanato, Artesanato } from '../artesanato/artesanato';
import { modelosProntas, Prontas } from '../prontas/prontas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-buscar',
  templateUrl: './buscar.html',
  styleUrls: ['./buscar.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})

export class Buscar implements OnInit{
  searchQuery = '';
  resultados: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      this.buscar();
    });
  }

// Função para remover acentos e transformar em minúsculas
  normalizeString(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  buscar() {
    if (!this.searchQuery.trim()) {
      this.resultados = [];
      return;
    }

  const termo = this.normalizeString(this.searchQuery);

  const resultadoEncomendas = prod_encomenda.filter(p =>
    this.normalizeString(p.nome).includes(termo)
    ).map(p => ({...p, tipo: 'encomenda'}));

    // Buscar no array de prontas
    const resultadoProntas = modelosProntas.filter(p =>
      this.normalizeString(p.nome).includes(termo)
      ).map(p => ({...p, tipo: 'pronta'}));

    // Buscar no array de artesanato
    const resultadoArtesanato = artesanato.filter(p =>
      this.normalizeString(p.nome).includes(termo)
      ).map(p => ({...p, tipo: 'artesanato'}));

    // Juntar tudo
    this.resultados = [...resultadoEncomendas, ...resultadoProntas, ...resultadoArtesanato];
  }
  verMais(produto: any) {
  if (!produto || !produto.nome || !produto.tipo) {
    alert('Produto inválido para navegação');
    return;
  }

  const slug = produto.nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');

  const tipo = produto.tipo.toLowerCase();

  if (tipo === 'pronta') {
    this.router.navigate(['/produto-detalhes', slug]);
  } else if (tipo === 'encomenda') {
    this.router.navigate(['/encomenda', slug]);
  } else if (tipo === 'artesanato') {
    this.router.navigate(['/artesanato-detalhes', slug]);
  } else {
    this.router.navigate(['/produto-detalhes', slug]);
  }
}

showBackToTop = false;
@HostListener('window:scroll', [])
onWindowScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  this.showBackToTop = scrollTop > 300; // Exibe o botão após rolar 300px
}

scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
}
