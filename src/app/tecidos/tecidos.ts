import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-tecidos',
  imports: [RouterModule, CommonModule],
  templateUrl: './tecidos.html',
  styleUrls: ['./tecidos.css'],
})
export class Tecidos {
  constructor() {
    console.log('📦 TecidosComponent carregado');
  }
  abas = ['Soft', 'Fleece', 'Microsoft', 'Sazonais'];
  abaAtiva = 0;

  mudarAba(index: number) {
    this.abaAtiva = index;
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
