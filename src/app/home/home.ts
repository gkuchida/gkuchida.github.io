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
      nome: 'Vestido Floral',
      descricao: 'Para passeios de verão',
      imagem: 'https://i.ibb.co/Q78qfjpf/IMG-6318.png',
      link: '/prontas'
    },
    {
      nome: 'Camiseta Pet',
      descricao: 'Conforto diário',
      imagem: 'https://i.ibb.co/xj8r7Tr/pet-shirt.png',
      link: '/prontas'
    },
    {
      nome: 'Macacão Xadrez',
      descricao: 'Para o friozinho',
      imagem: 'https://i.ibb.co/4MFMzp5/macacao.png',
      link: '/prontas'
    },
    {
      nome: 'Bandana Azul',
      descricao: 'Charme extra no passeio',
      imagem: 'https://i.ibb.co/K7ZkzZN/bandana.png',
      link: '/prontas'
    },
    {
      nome: 'Colete Jeans',
      descricao: 'Muito estilo para o seu pet',
      imagem: 'https://i.ibb.co/ZVP8vxh/colete.png',
      link: '/prontas'
    },
    {
      nome: 'Capa de Chuva',
      descricao: 'Proteção nos dias molhados',
      imagem: 'https://i.ibb.co/6H3hF2n/capa-chuva.png',
      link: '/prontas'
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
        interval: 4000,
        ride: 'carousel'
      });
    }

    const vitrineCarousel = document.querySelector('#vitrineCarousel');
    if (vitrineCarousel) {
      new Carousel(vitrineCarousel, {
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
}
