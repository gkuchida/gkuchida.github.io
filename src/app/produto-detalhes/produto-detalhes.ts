import { Component, OnInit, HostListener, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NegritoPipe } from '../pipe/pipe';
import { modelosProntas } from '../prontas/prontas';
import { CarrinhoService, CarrinhoItem } from '../services/carrinho.service';
import { MatDialog } from '@angular/material/dialog';
import { MsgSucesso } from '../msg-sucesso/msg-sucesso';

@Component({
  selector: 'app-produto-detalhes',
  standalone: true,
  imports: [CommonModule, RouterModule, NegritoPipe],
  templateUrl: './produto-detalhes.html',
  styleUrls: ['./produto-detalhes.css']
})
export class ProdutoDetalhes implements OnInit {
  produto: any;
  showBackToTop = true;

  private route = inject(ActivatedRoute);
  private carrinhoService = inject(CarrinhoService);
  private dialog = inject(MatDialog);

  comprar(modelo: { nome: string; imagens: string[] }) {
    const item: CarrinhoItem = {
      tipo: 'pronta',
      nomeModelo: modelo.nome,
      imagens: modelo.imagens,
    };

    this.carrinhoService.addItem(item);

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

  ngOnInit(): void {
    const nome = this.route.snapshot.paramMap.get('nome')?.toLowerCase().trim();
    console.log("Nome recebido:", nome);

    this.produto = modelosProntas.find(p => p.nome.toLowerCase().trim() === nome);
    console.log("Produto encontrado:", this.produto);
  }
}
