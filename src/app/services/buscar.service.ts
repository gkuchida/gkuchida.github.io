import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ProdutoBusca {
  nome: string;
  imagens: string[];
  origem: 'pronta' | 'encomenda' | 'artesanato';
}

@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  private produtos: ProdutoBusca[] = [
    // Prontas
    {
      nome: 'Vestido Floral',
      imagens: ['https://i.ibb.co/Q78qfjpf/IMG-6318.png'],
      origem: 'pronta'
    },
    {
      nome: 'Camiseta Básica',
      imagens: ['https://example.com/camiseta-basica-1.jpg'],
      origem: 'pronta'
    },

    // Encomenda
    {
      nome: 'Vestido Sob Medida',
      imagens: ['https://i.ibb.co/XXXXX/vestido1-1.png'],
      origem: 'encomenda'
    },
    {
      nome: 'Camisa Sob Medida',
      imagens: ['https://i.ibb.co/ZZZZZ/camisa1-1.png'],
      origem: 'encomenda'
    },

    // Artesanato
    {
      nome: 'Pano de cobrir',
      imagens: ['https://i.ibb.co/Q78qfjpf/IMG-6318.png'],
      origem: 'artesanato'
    },
    {
      nome: 'Pano de cobrir Cereja',
      imagens: ['https://i.ibb.co/Q78qfjpf/IMG-6318.png'],
      origem: 'artesanato'
    }
  ];

  buscar(query: string): Observable<ProdutoBusca[]> {
    const termo = query.toLowerCase();
    const resultados = this.produtos.filter(produto =>
      produto.nome.toLowerCase().includes(termo)
    );
    return of(resultados);
  }
}
