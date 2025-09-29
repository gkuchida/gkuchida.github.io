/* medidas.ts */
import { Component,HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EncomendaService, ProdutoSelecionado, MedidasPedido } from '../services/encomenda.service';
import { FormsModule } from '@angular/forms';
import { MsgErro } from '../msg-erro/msg-erro';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-medidas',
  standalone: true,
  templateUrl: './medidas.html',
  styleUrls: ['./medidas.css'],
  imports: [CommonModule, FormsModule]
})

export class Medidas {
  produto?: ProdutoSelecionado;

  medidas: MedidasPedido = {
    pescoco: '',
    torax: '',
    comprimento: '',
    observacoes: ''
  };

  constructor(private encomendaService: EncomendaService, private router: Router, private dialog: MatDialog) {
    this.produto = this.encomendaService.getProdutoSelecionado();

    if (!this.produto) {
      this.router.navigate(['/encomenda']);
    }
  }

  validarCampos(): boolean {
    return !!(this.medidas.pescoco && this.medidas.torax && this.medidas.comprimento);
  }

  ok() {
    if (!this.validarCampos()) {
      //alert('Preencha os campos obrigatórios: pescoço, tórax e comprimento.');
       this.dialog.open(MsgErro, {
        width: '400px',
        data: { medidas: this.medidas },
        panelClass: 'custom-modal'
      });
      return;
    }
    this.encomendaService.setMedidas(this.medidas);
    this.router.navigate(['/confirmar']);
  }
  showBackToTop = false;
    @HostListener('window:scroll', [])
    onWindowScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.showBackToTop = scrollTop > 300; 
    }

    scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
