import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService, CarrinhoItem } from '../services/carrinho.service';
import { MatDialog } from '@angular/material/dialog';
import { MsgSucesso } from '../msg-sucesso/msg-sucesso';
import { FormsModule } from '@angular/forms';
import { NegritoPipe } from '../pipe/pipe';
import { RouterModule } from '@angular/router';

export const modelosProntas =[
   {
    nome: 'Vestido Soft + Jeans M',
    tamanhos: ['M'],
    descricao: '*Tecidos:* Soft, Jeans, Microsoft e Pele.\n*Cor*: Branco com desenhos de animais marinhos, jeans, amarelo.\n*Medidas:*\n- Pescoço: 44cm.\n- Tórax: 54cm.\n- Comprimento: 48cm.',
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
    descricao: '*Tecido:* Soft.\n*Cor:* Amarelo com desenhos de ursos cinza e corações rosa.\n*Medidas:*\n- Pescoço: 40cm.\n- Tórax: 44cm.\n- Comprimento: 30cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/Gv0TwX2f/Vestido-Babado-Fte-removebg-preview.png',
      'https://i.ibb.co/Z6ndjTrD/IMG-7037.png'
    ]
  },
   {
    nome: 'Capa Dupla Face G',
    tamanhos: ['G'],
    descricao: '*Tecidos:* Soft externo e Microsoft interno.\n*Cor:* Amarelo com desenhos de ursos cinza e corações rosa.\n*Medidas:*\n- Pescoço: 48 a 55cm.\n- Tórax: 54 a 63cm.\n- Comprimento: 44cm.',
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
    descricao: '*Tecido:* Fleece com acabamento de ribanas rosa.\n*Cor:* Rosa com desenhos coloridos de animais (marrom, azul, verde, amarelo).\n*Medidas:*\n- Pescoço: 22cm.\n- Tórax: 48cm.\n- Comprimento: 35cm.',
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
    descricao: '*Tecido:* Soft com acabamento de ribanas preta.\n*Cor:* Rosa com desenhos de ursos amarelos e nuvens brancas.\n*Medidas:*\n- Pescoço: 52cm.\n- Tórax: 66cm.\n- Comprimento: 50cm.',
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
    descricao: '*Tecido:* Soft com acabamento de ribanas rosa.\n*Cor:* Rosa com desenhos ursos amarelos e nuvens brancas.\n*Medidas:*\n- Pescoço: 34cm.\n- Tórax: 52cm.\n- Comprimento: 40cm.',
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
    descricao: '*Tecido:* Soft externo, Microsoft interno com acabamento de ribanas vermelha.\n*Cor:* Azul com desenhos azul e vermelho. Interno na cor amarelo.\n*Medidas:*\n- Pescoço: 28cm.\n- Tórax: 44cm.\n- Comprimento: 27cm.',
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
    descricao: '*Tecido:* Soft com acabamento de ribanas vermelha.\n*Cor:* Vermelho com desenhos de caminhões e trator azul e amarelo.\n*Medidas:*\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
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
    descricao: '*Tecido:* Fleece com acabamento em fleece.\n*Cor:* Vermelho com desenhos de abelhas.\n*Medidas:*\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/G4n31LzC/IMG-6722.png',
      'https://i.ibb.co/Cs8M9q5L/.png'
    ]
  },
  {
    nome: 'Capa de chuva Bagun G',
    tamanhos: ['G'],
    descricao: '*Tecido:* Nylon Bagun.\n*Cor:* Azul marinho com acabamento em viés amarelo e botões de pressão amarelos. Fechamento em velcro.\n*Medidas:*\n- Pescoço: 48 a 56 cm.\n- Tórax: 60 a 66 cm.\n- Comprimento: 46 cm.\n<br>*Atenção:* Este modelo oferece ótima proteção contra a maioria das chuvas, mas não é projetado para enfrentar temporais fortes.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/7Jyx4wWc/Capa-Bagun-Costas.png',
      'https://i.ibb.co/HjSKcJz/Capa-Bagun-FTE.png'
    ]
  },

  {
    nome: 'Capa de chuva transpasse G',
    tamanhos: ['G'],
    descricao: '*Tecido:* Nylon 70.\n*Cor:* Azul claro. Fechamento em velcro.\n*Medidas:*\n- Pescoço: 50 a 55 cm.\n- Tórax: 54 a 62 cm.\n- Comprimento: 36 cm.\n <br>*Atenção:* Este modelo oferece ótima proteção contra a maioria das chuvas, mas não é projetado para enfrentar temporais fortes.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/cXsVFZJv/Capa-Nylon-Transpasse-FTE.png',
      'https://i.ibb.co/FZ2x3mt/Capa-Nylon-Transpasse-Costas.png'
    ]
  },
  {
    nome: 'Capa de chuva G',
    tamanhos: ['G'],
    descricao: '*Tecido:*  Nylon 70.\n*Cor:* Azul claro. Fechamento em velcro.\n*Medidas:*\n- Pescoço: 43 a 47 cm.\n- Tórax: 67 a 72 cm.\n- Comprimento: 46 cm.\n<br>*Atenção:* Este modelo oferece ótima proteção contra a maioria das chuvas, mas não é projetado para enfrentar temporais fortes.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/rKFNFnrF/Capa-Nylon-FTE.png',
      'https://i.ibb.co/Y7mFJLnm/Capa-Nylon-Costas.png'
    ]
  },
  {
    nome: 'Bandana P',
    tamanhos: ['P'],
    descricao: '*Tecido:* Tricoline. Fechamento com botões de pressão.\n*Cor:* Lado 1: Rosa com desenhos de flamingos e frutas. Lado 2: Pink.\n*Medidas:*\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
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
    descricao: '*Tecido:* Tricoline. Fechamento com botões de pressão.\n*Cor:* Lado 1: Listrado com desenhos de leão e tucano. Lado 2: Verde.\n*Medidas:*\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
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
    descricao: '*Tecido:* Tricoline. Fechamento com botões de pressão.\n*Cor:* Lado 1: Rosa com desenhos de flamingos e frutas. Lado 2: Laranjado\n*Medidas:*\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/SXqzWSp7/Blar-Fte-removebg-preview.png',
      'https://i.ibb.co/wFvTjLVq/blar-removebg-preview.png',
      'https://i.ibb.co/d4zRMd8H/blar-tras-removebg-preview.png'
    ]
  },
   {
    nome: 'Básica Moletinho P',
    tamanhos: ['P'],
    descricao: '*Tecido:* Moletinho.\n*Cor:* Branco com desenhos de guaximin cinza e flores rosas.\n*Medidas:*\n- Pescoço: 38cm.\n- Tórax: 48cm.\n- Comprimento: 33cm.',
    preco: 30,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/SwkK7ygQ/IMG-7038.png',
      'https://i.ibb.co/bgnCMfTc/IMG-6635.png'
    ]
  },
];
@Component({
  selector: 'app-prontas',
  standalone: true,
  templateUrl: './prontas.html',
  styleUrls: ['./prontas.css'],
  imports: [CommonModule, RouterModule, NegritoPipe]
})
export class Prontas {
  produtos = modelosProntas;
  showBackToTop = true;
  constructor(private carrinhoService: CarrinhoService, private dialog: MatDialog) {}

  comprar(modelo: { nome: string; imagens: string[] }) {
  const item: CarrinhoItem = {
    tipo: 'pronta',
    nomeModelo: modelo.nome,
    imagens: modelo.imagens,
  };

  this.carrinhoService.addItem(item);
  //alert(`"${modelo.nome}" adicionado ao carrinho!`);
  this.dialog.open(MsgSucesso, {
    width: '400px',
    data: { nome: modelo.nome },
    panelClass: 'custom-modal'
  });
  }

    @HostListener('window:scroll', [])
    onWindowScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.showBackToTop = scrollTop > 300;
    }
    scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
