import { Component } from '@angular/core';
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
}
