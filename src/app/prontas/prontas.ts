import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService, CarrinhoItem } from '../services/carrinho.service';

@Component({
  selector: 'app-prontas',
  standalone: true,
  templateUrl: './prontas.html',
  styleUrls: ['./prontas.css'],
  imports: [CommonModule]
})
export class Prontas {
  modelos = [
  {
    nome: 'Vestido Soft + Jeans M',
    tamanhos: ['M'],
    descricao: 'Tecidos: Soft, Jeans, Microsoft e Pele.\nCor: Branco com desenhos de animais marinhos, jeans, amarelo.\nMedidas:\n- Pescoço: 44cm.\n- Tórax: 54cm.\n- Comprimento: 48cm.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/9H1Q3QjC/Vestido-Jeans-Fte-removebg-preview.png',
      'https://i.ibb.co/tp0Pm9hk/IMG-7036.png'
    ]
  },
  {
    nome: 'Vestido Babadinho P',
    tamanhos: ['P'],
    descricao: 'Tecido: Soft.\nCor: Amarelo com desenhos de ursos cinza e corações rosa.\nMedidas:\n- Pescoço: 40cm.\n- Tórax: 44cm.\n- Comprimento: 30cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/Gv0TwX2f/Vestido-Babado-Fte-removebg-preview.png',
      'https://i.ibb.co/Z6ndjTrD/IMG-7037.png'
    ]
  },
  {
    nome: 'Básica Moletinho P',
    tamanhos: ['P'],
    descricao: 'Tecido: Moletinho.\nCor: Branco com desenhos de guaximin cinza e flores rosas.\nMedidas:\n- Pescoço: 38cm.\n- Tórax: 48cm.\n- Comprimento: 33cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/SwkK7ygQ/IMG-7038.png',
      'https://i.ibb.co/bgnCMfTc/IMG-6635.png'
    ]
  },
   {
    nome: 'Capa Dupla Face G',
    tamanhos: ['G'],
    descricao: 'Tecidos: Soft externo e Microsoft interno.\nCor: Amarelo com desenhos de ursos cinza e corações rosa.\nMedidas:\n- Pescoço: 48 a 55cm.\n- Tórax: 54 a 63cm.\n- Comprimento: 44cm.',
    preco: 35,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/8nbDNnZQ/IMG-6574.png',
      'https://i.ibb.co/Z1fkn1hr/IMG-6710.png'
    ]
  },
  {
    nome: 'Básica P',
    tamanhos: ['P'],
    descricao: 'Tecido: Fleece com acabamento de ribanas rosa.\nCor: Rosa com desenhos coloridos de animais (marrom, azul, verde, amarelo).\nMedidas:\n- Pescoço: 22cm.\n- Tórax: 48cm.\n- Comprimento: 35cm.',
    preco: 20,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/qYVJ8595/IMG-6841.png',
      'https://i.ibb.co/mFBhFW5v/IMG-6448.png'
    ]
  },
  {
    nome: 'Básica GG',
    tamanhos: ['GG'],
    descricao: 'Tecido: Soft com acabamento de ribanas preta.\nCor: Rosa com desenhos de ursos amarelos e nuvens brancas.\nMedidas:\n- Pescoço: 52cm.\n- Tórax: 66cm.\n- Comprimento: 50cm.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/BHR80ZRj/IMG-6044.png',
      'https://i.ibb.co/PvFd9cTr/IMG-6045.png'
    ]
  },
  {
    nome: 'Básica G',
    tamanhos: ['G'],
    descricao: 'Tecido: Soft com acabamento de ribanas rosa.\nCor: Rosa com desenhos ursos amarelos e nuvens brancas.\nMedidas:\n- Pescoço: 34cm.\n- Tórax: 52cm.\n- Comprimento: 40cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/JRC5kzHt/IMG-5682.png',
      'https://i.ibb.co/qYBWsDLb/IMG-5681.png'
    ]
  },
   {
    nome: 'Básica PP',
    tamanhos: ['PP'],
    descricao: 'Tecido: Soft externo, Microsoft interno com acabamento de ribanas vermelha.\nCor: Azul com desenhos azul e vermelho. Interno na cor amarelo.\nMedidas:\n- Pescoço: 28cm.\n- Tórax: 44cm.\n- Comprimento: 27cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/8DRKM884/IMG-6948.png',
      'https://i.ibb.co/X0c07nq/IMG-6721.png'
    ]
  },
  {
    nome: 'Blusa Raglan M',
    tamanhos: ['M'],
    descricao: 'Tecido: Soft com acabamento de ribanas vermelha.\nCor: Vermelho com desenhos de caminhões e trator azul e amarelo.\nMedidas:\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/8DfZ0msC/Blusa-Raglan-Fte.png',
      'https://i.ibb.co/Cs8M9q5L/Blusa-Raglan-Verso.png'
    ]
  },
  {
    nome: 'Básica PP',
    tamanhos: ['PP'],
    descricao: 'Tecido: Fleece com acabamento em fleece.\nCor: Vermelho com desenhos de abelhas.\nMedidas:\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/G4n31LzC/IMG-6722.png',
      'https://i.ibb.co/Cs8M9q5L/.png'
    ]
  },
  {
    nome: 'Bandana P',
    tamanhos: ['P'],
    descricao: 'Tecido: Tricoline. Fechamento com botões de pressão.\nCor: Lado 1: Rosa com desenhos de flamingos e frutas. Lado 2: Pink.\nMedidas:\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/jvCg57Qp/BPink-Fte-removebg-preview.png',
      'https://i.ibb.co/Kz5ZM3jL/BPink-Vers-removebg-preview.png',
      'https://i.ibb.co/JRsqyrdc/BPink-Tras-removebg-preview.png'
    ]
  },
  {
    nome: 'Bandana M',
    tamanhos: ['M'],
    descricao: 'Tecido: Tricoline. Fechamento com botões de pressão.\nCor: Lado 1: Listrado com desenhos de leão e tucano. Lado 2: Verde.\nMedidas:\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/DgSwqwjg/BVer-fte-removebg-preview.png',
      'https://i.ibb.co/svWrz5Jq/BVer-costas-removebg-preview.png',
      'https://i.ibb.co/hJPQD58F/BVer-tras-removebg-preview.png'
    ]
  },
  {
    nome: 'Bandana M',
    tamanhos: ['M'],
    descricao: 'Tecido: Tricoline. Fechamento com botões de pressão.\nCor: Lado 1: Rosa com desenhos de flamingos e frutas. Lado 2: Laranjado\nMedidas:\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/SXqzWSp7/Blar-Fte-removebg-preview.png',
      'https://i.ibb.co/wFvTjLVq/blar-removebg-preview.png',
      'https://i.ibb.co/d4zRMd8H/blar-tras-removebg-preview.png'
    ]
  },
];

  constructor(private carrinhoService: CarrinhoService) {}

  comprar(modelo: { nome: string; imagens: string[] }) {
  const item: CarrinhoItem = {
    tipo: 'pronta',
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
