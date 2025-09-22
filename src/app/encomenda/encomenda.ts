import { Component, HostListener } from '@angular/core';
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
      nome: 'Básica',
      tecidos: ['Soft', 'Fleece', 'Moletom'],
      imagens: [
        'https://i.ibb.co/FLsGfrW5/Basica-Fte.png',
        'https://i.ibb.co/gMj637z5/Basica-Verso.png',
      ],
    },
    {
      nome: 'Vestido Raglan',
      tecidos: ['Soft', 'Fleece', 'Moletom'],
      imagens: [
        'https://i.ibb.co/9fc0Vjb/Vestido-Raglan-FTE.png',
        'https://i.ibb.co/GfyPvzyd/Vestido-Raglan-Verso.png',
      ],
    },
    {
      nome: 'Vestido Regata',
      tecidos: ['Soft', 'Fleece', 'Moletom'],
      imagens: [
        'https://i.ibb.co/cSJvgs8N/Vestido-Regata-FTE.png',
        'https://i.ibb.co/ycTWpVrH/Vestido-Regata-Verso.png',
      ],
    },
    {
      nome: 'Blusa Raglan',
      tecidos: ['Soft', 'Fleece', 'Moletom'],
      imagens: [
        'https://i.ibb.co/8DfZ0msC/Blusa-Raglan-Fte.png',
        'https://i.ibb.co/Cs8M9q5L/Blusa-Raglan-Verso.png',
      ],
    },
    {
      nome: 'Capa Dupla Face',
      tecidos: ['Soft + Fleece','Soft + Microsoft', 'Soft + Pele', 'Fleece + Fleece','Fleece + Pele', 'Fleece + Microsoft', 'Jeans + Soft', 'Jeans + Microsoft', 'Jeans + Fleece', 'Jeans + Pele', 'Jeans + Moletom', 'Moletom + Soft', 'Moletom + Fleece', 'Moletom + Pele'],
      imagens: [
        'https://i.ibb.co/FLcHXv8C/Jaqueta-Soft-Costas.png',
        'https://i.ibb.co/7d19zCWF/Capa-DF-Verso.png',
      ],
    },
    {
      nome: 'Capa Veste Fácil',
      tecidos: ['Soft + Fleece','Soft + Microsoft', 'Soft + Pele', 'Fleece + Fleece','Fleece + Pele', 'Fleece + Microsoft', 'Jeans + Soft', 'Jeans + Microsoft', 'Jeans + Fleece', 'Jeans + Pele', 'Jeans + Moletom', 'Moletom + Soft', 'Moletom + Fleece', 'Moletom + Pele'],
      imagens: [
        'https://i.ibb.co/WW9bXSbJ/Capa-VF-Fte.png',
        'https://i.ibb.co/G3MdCjfs/Capa-VF-Verso.png',
      ],
    },
    {
      nome: 'Jaqueta Dupla Face',
      tecidos: ['Soft + Fleece','Soft + Microsoft', 'Soft + Pele', 'Fleece + Fleece','Fleece + Pele', 'Fleece + Microsoft', 'Jeans + Soft', 'Jeans + Microsoft', 'Jeans + Fleece', 'Jeans + Pele', 'Jeans + Moletom', 'Moletom + Soft', 'Moletom + Fleece', 'Moletom + Pele'],
      imagens: [
        'https://i.ibb.co/NXxJHdD/Jaqueta-Fte.png',
        'https://i.ibb.co/0yf26srW/Jaqueta-Verso.png',
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
