// confirmar.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EncomendaService, ProdutoSelecionado, MedidasPedido } from '../services/encomenda.service';
import { CarrinhoService, CarrinhoItem } from '../services/carrinho.service';

@Component({
  selector: 'app-confirmar',
  standalone: true,
  templateUrl: './confirmar.html',
  styleUrls: ['./confirmar.css'],
  imports: [CommonModule]
})
export class Confirmar {
  produto?: ProdutoSelecionado;
  medidas?: MedidasPedido;

  constructor(
    private encomendaService: EncomendaService,
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {
    this.produto = this.encomendaService.getProdutoSelecionado();
    this.medidas = this.encomendaService.getMedidas();

    if (!this.produto) {
      // Produto obrigatório
      this.router.navigate(['/encomenda']);
    }
  }

  confirmar() {
    if (!this.produto) {
      alert('Nenhum produto selecionado.');
      this.router.navigate(['/encomenda']);
      return;
    }

    const isEncomenda = !!this.medidas;

    // Monta o item do carrinho dependendo do tipo
    const item: CarrinhoItem = {
      tipo: isEncomenda ? 'encomenda' : 'pronta',
      nomeModelo: this.produto.nome,
      tecido: this.produto.tecido,
      imagens: this.produto.imagens,//imagemUrl: this.produto.imagens[0],
      medidas: this.medidas
    };

    if (isEncomenda && this.medidas) {
      item.medidas = this.medidas;
    }

    this.carrinhoService.addItem(item);

    // Monta mensagem para WhatsApp
    let mensagem = `*Novo pedido:*\nProduto: ${item.nomeModelo}\nTecido: ${item.tecido}\n`;

    if (isEncomenda && this.medidas) {
      mensagem += `Medidas:\n- Pescoço: ${this.medidas.pescoco}\n- Tórax: ${this.medidas.torax}\n- Comprimento: ${this.medidas.comprimento}\n`;
      if (this.medidas.observacoes) {
        mensagem += `Observações: ${this.medidas.observacoes}\n`;
      }
    }
    // Limpa o serviço para evitar dados antigos
    this.encomendaService.limpar();

    // Navega para o carrinho
    this.router.navigate(['/carrinho']);
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
