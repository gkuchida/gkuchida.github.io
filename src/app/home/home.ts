import { Component, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Carousel } from 'bootstrap';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

interface Produto {
  nome: string;
  descricao: string;
  imagem: string;
  link: string;
}
interface Inspiracao {
  nome: string;
  descricao: string;
  imagem: string;
  link: string;
}

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, AfterViewInit {
  produtos: Produto[] = [
    {
      nome: 'Vestido Raglan',
      descricao: 'Estilo para sua pet.',
      imagem: 'https://i.ibb.co/9fc0Vjb/Vestido-Raglan-FTE.png',
      link: '/encomenda'
    },
    {
      nome: 'Básica Moletinho',
      descricao: 'Conforto diário',
      imagem: 'https://i.ibb.co/bgnCMfTc/IMG-6635.png',
      link: '/prontas'
    },
    {
      nome: 'Bandana',
      descricao: 'Seu pet estiloso.',
      imagem: 'https://i.ibb.co/SXqzWSp7/Blar-Fte-removebg-preview.png',
      link: '/prontas'
    },
    {
      nome: 'Vestido charmoso',
      descricao: 'Charme extra no passeio',
      imagem: 'https://i.ibb.co/9H1Q3QjC/Vestido-Jeans-Fte-removebg-preview.png',
      link: '/prontas'
    },
    {
      nome: 'Básica Fleece',
      descricao: 'Muito estilo para o seu pet',
      imagem: 'https://i.ibb.co/FLsGfrW5/Basica-Fte.png',
      link: '/prontas'
    },
    {
      nome: 'Colete Jeans',
      descricao: 'Seu pet quentinho e estiloso.',
      imagem: 'https://i.ibb.co/0yf26srW/Jaqueta-Verso.png',
      link: '/encomenda'
    },
    {
      nome: 'Capa veste fácil',
      descricao: 'Conforto e aquecimento.',
      imagem: 'https://i.ibb.co/9HFVgvTB/Capa-VF-Lat.png',
      link: '/encomenda'
    },
    {
      nome: 'Blusa Raglan',
      descricao: 'Conforto e aquecimento.',
      imagem: 'https://i.ibb.co/Cs8M9q5L/Blusa-Raglan-Verso.png',
      link: '/prontas'
    },
    {
      nome: 'Capa dupla face',
      descricao: 'Conforto e aquecimento.',
      imagem: 'https://i.ibb.co/7d19zCWF/Capa-DF-Verso.png',
      link: '/prontas'
    },
    {
      nome: 'Vestido babadinho',
      descricao: 'Conforto e aquecimento.',
      imagem: 'https://i.ibb.co/Gv0TwX2f/Vestido-Babado-Fte-removebg-preview.png',
      link: '/prontas'
    },
    {
      nome: 'Capa dupla face',
      descricao: 'Conforto e aquecimento.',
      imagem: 'https://i.ibb.co/RGZNHXCg/Capa-DF-M-Fte-removebg-preview.png',
      link: '/prontas'
    },
    {
      nome: 'Embalagem de presente grande',
      descricao: 'Deixe seu presente mais estiloso.',
      imagem: 'https://i.ibb.co/tpcvNgTq/Saco-GG-Aberto.png',
      link: '/artesanato'
    },
    {
      nome: 'Embalagem de presente pequeno',
      descricao: 'Deixe seu presente mais estiloso.',
      imagem: 'https://i.ibb.co/jP8JZxjD/IMG-6832-removebg-preview.png',
      link: '/artesanato'
    },
    {
      nome: 'Pano para cobrir',
      descricao: 'Proteja seus alimentos.',
      imagem: 'https://i.ibb.co/M5CwBqfb/IMG-6830-removebg-preview.png',
      link: '/artesanato'
    },
    {
      nome: 'Puxa-saco',
      descricao: 'Organize suas sacolas plásticas.',
      imagem: 'https://i.ibb.co/Q3Btgz07/IMG-6826-removebg-preview.png',
      link: '/artesanato'
    },
  ];

  slides: Produto[][] = [];

   inspiracoes: Inspiracao[] = [
    {
      nome: 'Tequila',
      descricao: 'Modelo que a Luna escolheu: Vestido Babadinho',
      imagem: 'https://i.ibb.co/vvfYHVNh/q1.png',
      link: '/encomenda'
    },
    {
      nome: 'Tyron',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/LhYfV1pg/q2.png',
      link: '/encomenda'
    },
     {
      nome: 'Umi, Vic, Musashi',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/6cpHnS7N/q3.png',
      link: '/encomenda'
    },
    {
      nome: 'Lili',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/Z6tpmZ1d/q4.png',
      link: '/prontas'
    },
    {
      nome: 'Miyu',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/HLp0dNCx/q5.png',
      link: '/prontas'
    },
    {
      nome: 'Luna',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/CpGgHfDx/q6.png',
      link: '/prontas'
    },
    {
      nome: 'Toquinho',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/0yKdh7nb/q7.png',
      link: '/prontas'
    },
    {
      nome: 'Lilo',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/Q7fZHcjF/q8.png',
      link: '/prontas'
    },
    {
      nome: 'Maya',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/DPfT0MTx/q9.png',
      link: '/prontas'
    },
    {
      nome: 'Mani, Cacau, Maia',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/zTKcDWf8/q10.png',
      link: '/prontas'
    },
    {
      nome: 'Simba',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/F4MTJCV9/q11.png',
      link: '/prontas'
    },
    {
      nome: 'Pancho',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/P2yr3Gr/q12.png',
      link: '/prontas'
    },
    {
      nome: 'Belinha e Meli',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/QF7nVMmG/q13.png',
      link: '/prontas'
    },
    {
      nome: 'Floquinho',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/YFnMnF3k/q14.png',
      link: '/prontas'
    },
    {
      nome: 'Ikky',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/3mYRKzRp/q15.png',
      link: '/prontas'
    },
    {
      nome: 'Maia, Cacau e Mani',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/HpXRxHQ0/q16.png',
      link: '/prontas'
    },
    {
      nome: 'Blue',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/HDDdFyjw/q17.png',
      link: '/prontas'
    },
    {
      nome: 'Rosane',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/1fNNRwRx/q18.png',
      link: '/prontas'
    },
    {
      nome: 'Eeve',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/04RKP41/q19.png',
      link: '/prontas'
    },
    {
      nome: 'Simone',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/qFjnVLCp/q20.png',
      link: '/prontas'
    },
    {
      nome: 'Kiara',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/r2Kw4n82/q21.png',
      link: '/prontas'
    },
    {
      nome: 'Petricor',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/gL10RcwN/q22.png',
      link: '/prontas'
    },
    {
      nome: 'Gogh',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/hxVn50Mp/q23.png',
      link: '/prontas'
    },
    {
      nome: 'Ana Paula',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/N2bVNVPc/q24.png',
      link: '/prontas'
    },
    {
      nome: 'Nino',
      descricao: 'Estilo retrô para brilhar',
      imagem: 'https://i.ibb.co/Gvskc5xy/q25.png',
      link: '/prontas'
    },
  ]

  inspiracoesSlides!: Inspiracao[][];

  ngOnInit(): void {
    this.slides = this.chunkArray(this.produtos, 5);
    this.inspiracoesSlides = this.chunkArray(this.inspiracoes, 5);
  }

  categoriasMenu = [
  { nome: 'Pronta Entrega', link: '/prontas', img: 'https://i.ibb.co/ksq384jm/festa.png' },
  { nome: 'Monte o seu Pedido', link: '/encomenda', img: 'https://i.ibb.co/Q78qfjpf/IMG-6318.png'},
  { nome: 'Tecidos', link: '/tecidos', img: 'https://i.ibb.co/hFq3QPx5/F15.png' },
  { nome: 'Artesanato', link: '/artesanato', img: 'https://i.ibb.co/jP8JZxjD/IMG-6832-removebg-preview.png' },
  { nome: 'Contato', link: '/contato', img: 'https://i.ibb.co/1f4Wshxt/contact-5441692.png' },
  { nome: 'Sobre', link: '/sobre', img: 'https://i.ibb.co/35qdtH3p/sign-13604037.png' }
];


  ngAfterViewInit() {
    /*const carouselElement = document.querySelector('#homeCarousel');
    if (carouselElement) {
      new Carousel(carouselElement, {
        interval: 6000,
        ride: 'carousel'
      });
    }*/
    const carouselElement = document.querySelector('#homeCarousel');
      if (carouselElement) {
        const carousel = new Carousel(carouselElement, {
          interval: 4000
        });
      carousel.cycle();
    }

    const vitrineCarousel = document.querySelector('#vitrineCarousel');
    if (vitrineCarousel) {
      new Carousel(vitrineCarousel, {
        ride: false
      });
    }
     const inspiracoesCarousel = document.querySelector('#inspiracoesCarousel');
    if (inspiracoesCarousel) {
      new Carousel(inspiracoesCarousel, {
        ride: 'carousel'
      });
    }
  }

  private chunkArray(array: Produto[], tamanho: number): Produto[][] {
    const resultado: Produto[][] = [];
    for (let i = 0; i < array.length; i += tamanho) {
      resultado.push(array.slice(i, i + tamanho));
    }
    return resultado;
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
