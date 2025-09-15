import { Component } from '@angular/core';
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
    nome: 'Vestido Floral',
    descricao: 'Vestido leve com estampa floral perfeita para o verão.',
    preco: 120,
    estoque: 5,
    imagens: [
      'https://i.ibb.co/Q78qfjpf/IMG-6318.png'
    ]
    },
    {
    nome: 'Pano de cobrir',
    descricao: 'Vestido leve com estampa floral perfeita para o verão.',
    preco: 120,
    estoque: 5,
    imagens: [
      'https://i.ibb.co/Q78qfjpf/IMG-6318.png'
    ]
    },
     {
    nome: 'Pano de cobrir Cereja',
    descricao: 'Vestido leve com estampa floral perfeita para o verão.',
    preco: 120,
    estoque: 5,
    imagens: [
      'https://i.ibb.co/Q78qfjpf/IMG-6318.png'
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
}
