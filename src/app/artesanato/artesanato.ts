import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService, CarrinhoItem } from '../services/carrinho.service';

@Component({
  standalone: true,
  selector: 'app-artesanato',
  templateUrl: './artesanato.html',
  styleUrls: ['./artesanato.css'],
  imports: [CommonModule]
})
export class Artesanato {
  modelos = [
    {
    nome: 'Embalagem de tecido G',
    descricao: 'Embalagem para deixar sua lembrança mais charmosa.\nTecido: Tricoline.\nMedidas:',
    preco: 20,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/fsfcFDQ/Saco-GG-Fte.png',
      'https://i.ibb.co/tpcvNgTq/Saco-GG-Aberto.png'
    ]
    },
    {
    nome: 'Embalagem de tecido P',
    descricao: 'Embalagem para deixar sua lembrança mais charmosa.\nTecido: Tricoline.\nMedidas:',
    preco: 10,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/jP8JZxjD/IMG-6832-removebg-preview.png',
      'https://i.ibb.co/gZnKH3Ts/IMG-6833-removebg-preview.png'
    ]
    },
    {
    nome: 'Pano de cobrir Cereja',
    descricao: 'Pano para cobrir alimentos.\nTecido: Algodão com barrado de tricoline motivo cerejas',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/wZsKcZ2W/Pano-Cobrir-Cerejas-removebg-preview.png'
    ]
    },
    {
    nome: 'Pano de cobrir Bolinhas vermelhas',
    descricao: 'Pano para cobrir alimentos.\nTecido: Algodão com barrado de tricoline poá vermelho',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/tpGfMKZX/Pano-Cobrir-Poa-removebg-preview.png'
    ]
    },
    {
    nome: 'Pano de cobrir Cupcake',
    descricao: 'Pano para cobrir alimentos.\nTecido: Algodão com barrado de tricoline rosa com cupcakes',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/XrBD63JW/Pano-Cobrir-Cupcakes-removebg-preview.png'
    ]
    },
    {
    nome: 'Kit pano de prato + puxa-saco',
    descricao: 'Pano de prato pé de galinha e puxa-saco.\nTecido: Algodão com barrado de tricoline rosa.',
    preco: 30,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/CpWmt7zn/IMG-6827-removebg-preview.png',
      'https://i.ibb.co/Q3Btgz07/IMG-6826-removebg-preview.png'
    ]
    },
    {
    nome: 'Pano de prato',
    descricao: 'Pano de prato pé de galinha.\nTecido: Algodão com barrado de tricoline branco com corações.',
    preco: 15,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/M5CwBqfb/IMG-6830-removebg-preview.png',
    ]
    },
  ];

  constructor(private carrinhoService: CarrinhoService) {}

    comprar(modelo: { nome: string; imagens: string[] }) {
    const item: CarrinhoItem = {
      tipo: 'artesanato',
      nomeModelo: modelo.nome,
      imagens: modelo.imagens,    //imagemUrl: modelo.imagens[0]
    };

    this.carrinhoService.addItem(item);
    alert(`"${modelo.nome}" adicionado ao carrinho!`);
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
