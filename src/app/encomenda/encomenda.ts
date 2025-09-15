import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EncomendaService } from '../services/encomenda.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encomenda',
  standalone: true,
  templateUrl: './encomenda.html',
  styleUrls: ['./encomenda.css'],
  imports: [CommonModule, FormsModule]
})
export class Encomenda {
  produtos = [
    {
      nome: 'Vestido Sob Medida',
      tecidos: ['Algodão', 'Linho', 'Seda'],
      imagens: [
        'https://i.ibb.co/XXXXX/vestido1-1.png',
        'https://i.ibb.co/YYYYY/vestido1-2.png',
      ],
    },
    {
      nome: 'Camisa Sob Medida',
      tecidos: ['Linho', 'Algodão'],
      imagens: [
        'https://i.ibb.co/ZZZZZ/camisa1-1.png',
        'https://i.ibb.co/AAAAA/camisa1-2.png',
      ],
    },
  ];

  // Para armazenar o tecido escolhido por produto (índice do array)
  tecidosSelecionados: { [key: number]: string } = {};

  constructor(private encomendaService: EncomendaService, private router: Router) {}

  selecionar(index: number, produto: { nome: string; tecidos: string[]; imagens: string[] }) {
    const tecidoEscolhido = this.tecidosSelecionados[index];
    if (!tecidoEscolhido) {
      alert('Por favor, escolha o tecido antes de selecionar o produto.');
      return;
    }

    this.encomendaService.setProdutoSelecionado({
      nome: produto.nome,
      tecido: tecidoEscolhido,
      imagens: produto.imagens
    });

    this.router.navigate(['/medidas']);
  }
}
