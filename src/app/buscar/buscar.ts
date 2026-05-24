import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { prod_encomenda } from '../encomenda/encomenda';
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
  todosOsResultados: any[] = [];
  resultadosExibidos: any[] = [];

  filtrosSelecionados = {
    'estoque': true,
    'sob-encomenda': true,
  };

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      //this.buscar();
      this.carregarResultados();
    });
  }

// Função para remover acentos e transformar em minúsculas
  normalizeString(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  carregarResultados() {
    if (!this.searchQuery.trim()) {
      this.resultadosExibidos = [];
      this.todosOsResultados = [];
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

    const todosOsResultadosComDuplicata = [...resultadoEncomendas, ...resultadoProntas];

    // Remover Duplicatas (mantendo a lógica da unicidade pelo nome)
    const nomesVistos = new Set();
    this.todosOsResultados = todosOsResultadosComDuplicata.filter(produto => {
      const chave = this.normalizeString(produto.nome);
      if (nomesVistos.has(chave)) {
        return false;
      }
      nomesVistos.add(chave);
      return true;
    });
    this.aplicarFiltros();
  }
  // Função de Filtragem
  aplicarFiltros() {
   if (!this.filtrosSelecionados['estoque'] && !this.filtrosSelecionados['sob-encomenda']) {
        this.resultadosExibidos = [];
        return;
    }
    this.resultadosExibidos = this.todosOsResultados.filter(produto => {
      const temEstoque = produto.preco && produto.estoque && produto.estoque > 0;
      // 1. FILTRO 'COM ESTOQUE'
      if (temEstoque) {
          return this.filtrosSelecionados['estoque'];
      }
      // 2. FILTRO 'SOB ENCOMENDA'
      else {
          return this.filtrosSelecionados['sob-encomenda'];
      }

    });
  }

 // Função que será chamada no clique do card para navegação
  navegarDetalhes(produto: any) {
    if (!produto || !produto.nome || !produto.tipo) {
      alert('Produto inválido para navegação');
      return;
    }
    const slug = this.normalizeString(produto.nome).replace(/\s+/g, '-');
    const tipo = produto.tipo.toLowerCase();

    if (tipo === 'pronta') {
      this.router.navigate(['/produto-detalhes', slug]);
    } else if (tipo === 'encomenda') {
      this.router.navigate(['/encomenda', slug]);
    }  else {
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

  ordenacao: string = "";

  ordenarProdutos() {
    switch (this.ordenacao) {
      case "nomeAsc":
        this.resultadosExibidos.sort((a, b) => a.nome.localeCompare(b.nome));
        break;

      case "nomeDesc":
        this.resultadosExibidos.sort((a, b) => b.nome.localeCompare(a.nome));
        break;

      case "maiorValor":
        this.resultadosExibidos.sort((a, b) => b.preco - a.preco);
        break;

      case "menorValor":
        this.resultadosExibidos.sort((a, b) => a.preco - b.preco);
        break;

        case "comEstoque":
      this.resultadosExibidos = this.resultadosExibidos.filter(p =>
        p.preco && p.estoque && p.estoque > 0
      );
      break;

      case "sobEncomenda":
        this.resultadosExibidos = this.resultadosExibidos.filter(p =>
          !p.preco || !p.estoque || p.estoque === 0
        );
        break;

      default:
        break;
    }
  }
}
