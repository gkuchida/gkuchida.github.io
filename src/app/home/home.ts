import { Component, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Carousel } from 'bootstrap';
import { interval } from 'rxjs';
import { Prontas } from '../prontas/prontas';
import { modelosProntas, ProdutoPronto } from '../prontas/prontas';

interface ProdutoBase {
  nome: string;
  descricao: string;
  imagem: string;
  link: string;
  isNovidade: boolean;
}

interface Inspiracao {
  nome: string;
  descricao: string;
  imagem: string;
  link: string;
}

interface ProdutoRecomendado {
  nome: string;
  imagem: string;
  badge: string;
  categoria: string;
  link?: string;
  origem?: string; // 🔹 adicionei isso pra diferenciar artesanato/pronta
}

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, AfterViewInit {
  constructor(private router: Router) {}

  // 🟢 Carrossel “Recomendados para você”
  slides: ProdutoRecomendado[][] = [
    [
      { nome: 'Vestido Safári Rosa GG', imagem: 'https://i.ibb.co/JFgDQBwG/IMG-7593.png', badge: 'Top 1 Verão', categoria: 'verao', origem: 'prontas' },
      { nome: 'Básica GG', imagem: 'https://i.ibb.co/gMj637z5/Basica-Verso.png', badge: 'A mais vendida', categoria: 'inverno', origem: 'prontas' },
      { nome: 'Básica Moletinho P', imagem: 'https://i.ibb.co/bgnCMfTc/IMG-6635.png', badge: 'Meia Estação', categoria: 'meia-estacao', origem: 'prontas' },
      { nome: 'Capa de Chuva M', imagem: 'https://i.ibb.co/fzDb0X3n/Capa-Vermelha-M-Fte.png', badge: 'Chuva', categoria: 'inverno', origem: 'prontas' },
    ],
    [
      { nome: 'Vestido Rena Encantada GG', imagem: 'https://i.ibb.co/rfwd8hY3/IMG-7581.png', badge: 'Natal', categoria: 'festiva', origem: 'prontas' },
      { nome: 'Gorro de Natal', imagem: 'https://i.ibb.co/6J1QLySS/Gorro-M-Desenho.png', badge: 'Natal', categoria: 'festiva', origem: 'prontas' },
      { nome: 'Bandana com elástico Pets Verde P', imagem: 'https://i.ibb.co/HLcsB12f/Bandana-El-stico-Verde-Fte.png', badge: 'Acessório', categoria: 'acessorio', origem: 'prontas' },
      { nome: 'Kit com 2 Panos de prato', imagem: 'https://i.ibb.co/DHvNnsqG/Kit-Panos.png', badge: 'Artesanato', categoria: 'artesanato', origem: 'artesanato' },
    ]
  ];

  slidesNovidades: ProdutoPronto[][] = [];
  novidadesGroupSize = 5;

  categoriasMenu = [
    { nome: 'Pronta Entrega', link: '/prontas', img: 'https://i.ibb.co/pjmDvYJb/IMG-6978.png' },
    { nome: 'Sob encomenda', link: '/encomenda', img: 'https://i.ibb.co/278jM5Y4/metrica.png' },
    { nome: 'Tecidos', link: '/tecidos', img: 'https://i.ibb.co/nMsg8P31/tecido.png' },
    { nome: 'Artesanato', link: '/artesanato', img: 'https://i.ibb.co/36cfYjZ/artesanato.png' },
    { nome: 'Contato', link: '/contato', img: 'https://i.ibb.co/1f4Wshxt/contact-5441692.png' },
    { nome: 'Sobre', link: '/sobre', img: 'https://i.ibb.co/35qdtH3p/sign-13604037.png' }
  ];

  showBackToTop = false;

  ngOnInit(): void {
    this.checkScreenSize();
    this.updateNovidadesSlides();
  }

  ngAfterViewInit(): void {
    this.initCarousel('#homeCarousel', 4000);
    this.initCarousel('#vitrineCarousel', false);
    this.initCarousel('#inspiracoesCarousel', 'carousel');
    this.initCarousel('#carouselRecomendados', 'carousel');
  }

  private initCarousel(selector: string, intervalOrRide: number | boolean | string): void {
    const element = document.querySelector(selector);
    if (element) {
      const options: any = typeof intervalOrRide === 'number'
        ? { interval: intervalOrRide }
        : { ride: intervalOrRide };
      const carousel = new Carousel(element, options);
      if (typeof intervalOrRide === 'number') carousel.cycle();
    }
  }

  private chunkArray<T>(array: T[], tamanho: number): T[][] {
    const resultado: T[][] = [];
    for (let i = 0; i < array.length; i += tamanho) {
      resultado.push(array.slice(i, i + tamanho));
    }
    return resultado;
  }

  private checkScreenSize(): void {
    this.novidadesGroupSize = window.innerWidth <= 768 ? 1 : 5;
  }

  private updateNovidadesSlides(): void {
    const novidades = modelosProntas.filter(p => p.isNovidade);
    this.slidesNovidades = this.chunkArray(novidades, this.novidadesGroupSize);
  }

  // 🔵 Define a rota correta conforme o tipo/origem do produto
  getLink(produto: any): any[] {
    if (produto.origem === 'artesanato' || produto.categoria === 'criativa') {
      return ['/artesanato-detalhes', produto.nome];
    }
    return ['/produto-detalhes', produto.nome];
  }

  verDetalhe(produto: any) {
  // Se tiver link direto, usa ele
  if (produto?.link) {
    this.router.navigateByUrl(produto.link);
    return;
  }

  // 🔹 Se a categoria for artesanato, manda pra rota correta
  if (produto.categoria === 'artesanato' || produto.badge === 'Artesanato') {
    this.router.navigate(['/artesanato-detalhes', produto.nome]);

    return;
  }


  // Fallback genérico (se não encontrar em nenhum dos dois)
  console.warn('Produto não encontrado nas coleções:', produto);
  this.router.navigate(['/produto-detalhes', produto.nome]);
}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
    this.updateNovidadesSlides();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showBackToTop = scrollTop > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
