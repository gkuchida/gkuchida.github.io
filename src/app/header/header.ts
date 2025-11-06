import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

    constructor(private router: Router) {}

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

  // Função para fechar o menu (chamada ao clicar no item de navegação)
    fecharMenu() {
    this.menuAberto = false;
  }
}
