import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class Header {
  searchQuery: string = '';
  menuAberto: boolean = false;
  quantidadeCarrinho = 0;

  constructor(private router: Router, private carrinhoService: CarrinhoService) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/buscar'], {
        queryParams: { query: this.searchQuery.trim() }
      });
    }
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu() {
    this.menuAberto = false;
  }
}
