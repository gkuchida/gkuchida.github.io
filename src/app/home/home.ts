import { Component, AfterViewInit, OnInit } from '@angular/core';
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

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterModule, CommonModule, Header, Footer], // descomente se necessário
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
      nome: 'Básica Soft',
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

  ngOnInit(): void {
    this.slides = this.chunkArray(this.produtos, 5);
  }

  categoriasMenu = [
  { nome: 'Pronta Entrega', link: '/prontas', img: 'assets/icons/pronta.png' },
  { nome: 'Monte o seu Pedido', link: '/encomenda', img: 'assets/icons/pedido.png' },
  { nome: 'Tecidos', link: '/tecidos', img: 'assets/icons/tecidos.png' },
  { nome: 'Artesanato', link: '/artesanato', img: 'assets/icons/artesanato.png' },
  { nome: 'Contato', link: '/contato', img: 'assets/icons/contato.png' },
  { nome: 'Sobre', link: '/sobre', img: 'assets/icons/sobre.png' }
];


  ngAfterViewInit() {
    const carouselElement = document.querySelector('#homeCarousel');
    if (carouselElement) {
      new Carousel(carouselElement, {
        interval: 6000,
        ride: 'carousel'
      });
    }

    const vitrineCarousel = document.querySelector('#vitrineCarousel');
    if (vitrineCarousel) {
      new Carousel(vitrineCarousel, {
        ride: false
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
}
