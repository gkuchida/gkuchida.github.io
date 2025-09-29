import { Injectable } from '@angular/core';

export interface ProdutoSelecionado {
  nome: string;
  tecido?: string;
  imagens: string[];
}

export interface MedidasPedido {
  pescoco: string;
  torax: string;
  comprimento: string;
  observacoes?: string;
}

export interface ArtesanatoSelecionado {
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class EncomendaService {
  private produtoSelecionado?: ProdutoSelecionado;
  private medidas?: MedidasPedido;
  private artesanatoSelecionado?: ArtesanatoSelecionado;

  setProdutoSelecionado(produto: ProdutoSelecionado) {
    this.produtoSelecionado = produto;
  }

  getProdutoSelecionado(): ProdutoSelecionado | undefined {
    return this.produtoSelecionado;
  }

  setMedidas(medidas: MedidasPedido) {
    this.medidas = medidas;
  }

  getMedidas(): MedidasPedido | undefined {
    return this.medidas;
  }

  setArtesanatoSelecionado(produto: ArtesanatoSelecionado) {
    this.artesanatoSelecionado = produto;
  }

  getArtesanatoSelecionado(): ArtesanatoSelecionado | undefined {
    return this.artesanatoSelecionado;
  }

  limpar() {
    this.produtoSelecionado = undefined;
    this.medidas = undefined;
    this.artesanatoSelecionado = undefined;
  }
}
