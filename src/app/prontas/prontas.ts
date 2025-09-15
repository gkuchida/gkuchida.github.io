import { Component } from '@angular/core';
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
    nome: 'Vestido Floral',
    tamanhos: ['P', 'M', 'G'],
    descricao: 'Vestido leve com estampa floral perfeita para o verão.',
    preco: 120,
    estoque: 5,
    imagens: [
      'https://i.ibb.co/Q78qfjpf/IMG-6318.png',
      'https://example.com/vestido-floral-2.jpg'
    ]
  },
  {
    nome: 'Camiseta Básica',
    tamanhos: ['P', 'M', 'G', 'GG'],
    descricao: 'Camiseta de algodão confortável para o dia a dia.',
    preco: 50,
    estoque: 10,
    imagens: [
      'https://example.com/camiseta-basica-1.jpg',
      'https://example.com/camiseta-basica-2.jpg'
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
}
