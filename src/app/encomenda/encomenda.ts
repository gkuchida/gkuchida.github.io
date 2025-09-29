import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EncomendaService } from '../services/encomenda.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MsgErro } from '../msg-erro/msg-erro';

export const prod_encomenda =[
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
@Component({
  selector: 'app-encomenda',
  standalone: true,
  templateUrl: './encomenda.html',
  styleUrls: ['./encomenda.css'],
  imports: [CommonModule, FormsModule]
})
export class Encomenda {
  produtos = prod_encomenda;

  tecidosSelecionados: { [key: number]: string } = {};

  constructor(private encomendaService: EncomendaService, private router: Router, private dialog: MatDialog) {}

  selecionar(index: number, produto: { nome: string; tecidos: string[]; imagens: string[] }) {
    const tecidoEscolhido = this.tecidosSelecionados[index];
    if (!tecidoEscolhido) {
      //alert('Por favor, escolha o tecido antes de selecionar o produto.');
      this.dialog.open(MsgErro, {
        width: '400px',
        data: { tecido: tecidoEscolhido },
        panelClass: 'custom-modal'
      });
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
      this.showBackToTop = scrollTop > 300;
    }
    scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
