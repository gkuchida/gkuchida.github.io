import { Injectable, signal, Signal } from '@angular/core';

export interface CarrinhoItem {
  tipo: 'pronta' | 'encomenda' | 'artesanato';
  nomeModelo: string;
  tecido?: string;
  acabamento?: string;
  medidas?: {
    pescoco: string;
    torax: string;
    comprimento: string;
    observacoes?: string;
  };
  imagens: string[];
  tamanho?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private _items = signal<CarrinhoItem[]>([]);

  readonly items: Signal<readonly CarrinhoItem[]> = this._items.asReadonly();

  addItem(item: CarrinhoItem) {
    this._items.update(items => [...items, item]);
  }

  clear() {
    this._items.set([]);
  }

  removeItem(index: number) {
    this._items.update(itens => {
      const novoArray = [...itens];
      novoArray.splice(index, 1);
      return novoArray;
    });
  }
}
