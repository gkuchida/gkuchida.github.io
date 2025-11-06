import { Component, OnInit, HostListener, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CarrinhoService, CarrinhoItem } from '../services/carrinho.service';
import { artesanato } from '../artesanato/artesanato';
import { NegritoPipe } from '../pipe/pipe';
import { MsgSucesso } from '../msg-sucesso/msg-sucesso';

interface ProdutoArtesanato {
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagens: string[];
  observacao: string;
}

@Component({
  standalone: true,
  selector: 'app-artesanato-detalhes',
  imports: [CommonModule, RouterModule, NegritoPipe],
  templateUrl: './artesanato-detalhes.html',
  styleUrls: ['./artesanato-detalhes.css']
})

export class ArtesanatoDetalhes implements OnInit {
  produto: any;
  showBackToTop = true;

  private route = inject(ActivatedRoute);
  private carrinhoService = inject(CarrinhoService);
  private dialog = inject(MatDialog);
  private location = inject(Location);

  comprar(modelo: { nome: string; imagens: string[] }) {
    const item: CarrinhoItem = {
    tipo: 'artesanato',
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

    this.produto = artesanato.find(p => p.nome.toLowerCase().trim() === nome);
    console.log("Produto encontrado:", this.produto);
  }

  voltar(): void {
    this.location.back();
  }
}
