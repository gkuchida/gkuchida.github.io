import { Injectable, signal, Signal } from '@angular/core';
import { MedidasPedido } from './encomenda.service';
export interface CarrinhoItem {
  tipo: 'pronta' | 'encomenda' | 'artesanato';
  nomeModelo: string;
  tecido?: string;
  acabamento?: string;
  medidas?: MedidasPedido;
  imagens: string [];
  tamanho?: string;
  preco?:number;
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
