import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { prod_encomenda } from '../encomenda/encomenda';
import { artesanato, Artesanato } from '../artesanato/artesanato';
import { modelosProntas, Prontas } from '../prontas/prontas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-buscar',
  templateUrl: './buscar.html',
  styleUrls: ['./buscar.css'],
  imports: [CommonModule, FormsModule],
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

    //const termo = this.searchQuery.toLowerCase();
    const termo = this.normalizeString(this.searchQuery);

    // Buscar no array de encomendas
    const resultadoEncomendas = prod_encomenda.filter(p =>
      //p.nome.toLowerCase().includes(termo)
      this.normalizeString(p.nome).includes(termo)
    ).map(p => ({...p, tipo: 'encomenda'}));

    // Buscar no array de prontas
    const resultadoProntas = modelosProntas.filter(p =>
      //p.nome.toLowerCase().includes(termo) || (p.descricao && p.descricao.toLowerCase().includes(termo))
      this.normalizeString(p.nome).includes(termo)
    ).map(p => ({...p, tipo: 'pronta'}));

    // Buscar no array de artesanato
    const resultadoArtesanato = artesanato.filter(p =>
      //p.nome.toLowerCase().includes(termo) || (p.descricao && p.descricao.toLowerCase().includes(termo))
      this.normalizeString(p.nome).includes(termo)
    ).map(p => ({...p, tipo: 'artesanato'}));

    // Juntar tudo
    this.resultados = [...resultadoEncomendas, ...resultadoProntas, ...resultadoArtesanato];
  }
  /*verMais(tipo: string) {
    this.router.navigate([`/${tipo}`]);
  }*/
  verMais(produto: any) {
    if (!produto || !produto.tipo || !produto.nome) {
      alert('Produto inválido para navegação');
      return;
  }

  const rota = produto.tipo.toLowerCase();
  const nomeUrl = produto.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
  this.router.navigate([`/${rota}`, nomeUrl]);
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
