import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BuscarService, ProdutoBusca } from '../services/buscar.service';

@Component({
  standalone: true,
  selector: 'app-buscar',
  templateUrl: './buscar.html',
  styleUrls: ['./buscar.css'],
  imports: [CommonModule]
})
export class Buscar implements OnInit {
  query: string | null = null;
  resultados: ProdutoBusca[] = [];

  constructor(
    private route: ActivatedRoute,
    private buscarService: BuscarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.query = params.get('query');
      if (this.query) {
        this.buscarProdutos(this.query);
      } else {
        this.resultados = [];
      }
    });
  }

  buscarProdutos(termo: string) {
    this.buscarService.buscar(termo).subscribe({
      next: (produtos) => this.resultados = produtos,
      error: (err) => {
        console.error('Erro ao buscar produtos', err);
        this.resultados = [];
      }
    });
  }

  irParaProduto(produto: ProdutoBusca) {
    switch (produto.origem) {
      case 'pronta':
        this.router.navigate(['/prontas']);
        break;
      case 'encomenda':
        this.router.navigate(['/encomenda']);
        break;
      case 'artesanato':
        this.router.navigate(['/artesanato']);
        break;
      default:
        alert('Página não encontrada para esse produto.');
    }
  }
  showBackToTop = false;
    @HostListener('window:scroll', [])
    onWindowScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.showBackToTop = scrollTop > 300; // Exibe o botão após rolar 300px
    }

    scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
