import { Component, OnInit, HostListener, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NegritoPipe } from '../pipe/pipe';
import { modelosProntas } from '../prontas/prontas';
import { CarrinhoService, CarrinhoItem } from '../services/carrinho.service';
import { MatDialog } from '@angular/material/dialog';
import { MsgSucesso } from '../msg-sucesso/msg-sucesso';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-detalhes',
  standalone: true,
  imports: [CommonModule, RouterModule, NegritoPipe, FormsModule],
  templateUrl: './produto-detalhes.html',
  styleUrls: ['./produto-detalhes.css']
})
export class ProdutoDetalhes implements OnInit {
  produto: any;
  showBackToTop = true;

  tamanhoSelecionado: { [key: string]: string } = {};

  private route = inject(ActivatedRoute);
  private carrinhoService = inject(CarrinhoService);
  private dialog = inject(MatDialog);
  private location = inject(Location);

  comprar(modelo: { nome: string; imagens: string[] }) {
    const tamanho = this.tamanhoSelecionado[modelo.nome];
    const item: CarrinhoItem = {
      tipo: 'pronta',
      nomeModelo: modelo.nome,
      imagens: modelo.imagens,
      tamanho: tamanho
    };

    this.carrinhoService.addItem(item);

    this.dialog.open(MsgSucesso, {
      width: '400px',
      data: { nome: modelo.nome, tamanho: tamanho },
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

  ngOnInit(): void {
    const nomeParam = this.route.snapshot.paramMap.get('nome') || '';
    const nomeNormalizado = nomeParam
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/-/g, ' ')
      .trim();

    const normalize = (s: string) =>
      s.toLowerCase()
       .normalize('NFD')
       .replace(/[\u0300-\u036f]/g, '')
       .trim();

    this.produto = modelosProntas.find(p => normalize(p.nome) === nomeNormalizado);

    console.log('Produto encontrado:', this.produto);
  }

  voltar(): void {
    this.location.back();
  }
}
