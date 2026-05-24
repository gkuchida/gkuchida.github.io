import { Component, OnInit, HostListener, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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

  categoriaAba: string = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private carrinhoService = inject(CarrinhoService);
  private dialog = inject(MatDialog);
  private location = inject(Location);

  comprar(modelo: { nome: string; imagens: string[], preco: number }) {
    const tamanho = this.tamanhoSelecionado[modelo.nome];

    const item: CarrinhoItem = {
      tipo: 'pronta',
      nomeModelo: modelo.nome,
      imagens: modelo.imagens,
      tamanho: tamanho,
      preco: modelo.preco
    };


    this.carrinhoService.addItem(item);

    this.dialog.open(MsgSucesso, {
      width: '400px',
      data: { nome: modelo.nome, tamanho: tamanho },
      panelClass: 'custom-modal'
    });
  }
private removeTamanho(nome: string): string {
    return (nome || '').replace(/[\s-]?(pp|p|m|g|gg|xg|xxg)\s*$/i, '').trim();
  }
private removeModificadores(nome: string): string {
  const regexModificadores = /\s(Vermelha|Azul|Preta|Rosa|Verde|Amarela)\s*$/i;
  return (nome || '').replace(regexModificadores, '').trim();
}
  private toSlug(nome: string): string {
    const nomeSemTamanho = this.removeTamanho(nome);
    const nomeBase = this.removeModificadores(nomeSemTamanho);

    return nomeBase
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')      // Remove acentos
      .replace(/\s?\+\s?/g, ' ')            // Transforma '+' em espaço para ser substituído por hífen
      .replace(/[^a-z0-9\s]+/g, '')         // Remove outros símbolos (exceto espaços)
      .trim()                               // Remove espaços nas pontas
      .replace(/\s+/g, '-')                 // Transforma múltiplos espaços em um único hífen
      .replace(/^-+|-+$/g, '');             // Remove hífens extras nas pontas
  }

  irParaEncomenda(nome: string) {
    const nomeSlug = this.toSlug(nome);
    console.log('SLUG GERADO:', nomeSlug);
    this.router.navigate(['/encomenda', nomeSlug]);
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
    this.categoriaAba = localStorage.getItem('abaCategoria') ?? '';
    console.log('Produto encontrado:', this.produto);
  }

  voltar(): void {
    const aba = localStorage.getItem('abaAtiva') ?? '0';
    this.router.navigate(['/prontas'], { queryParams: { aba } });
  }
}
