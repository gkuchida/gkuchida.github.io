import { Component, HostListener } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import emailjs from 'emailjs-com';
import { MatDialog } from '@angular/material/dialog';
import { MsgContatoErro } from '../msg-contato/msg-contato-erro';
import { MsgContatoSucesso } from '../msg-contato/msg-contato-sucesso';

@Component({
  standalone: true,
  selector: 'app-fale-conosco',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './contato.html',
  styleUrls: ['./contato.css']
})
export class Contato {
  contatoForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private dialog: MatDialog) {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensagem: ['', [Validators.required, Validators.minLength(10)]]
    });
     emailjs.init('Gxhd3YDu7ljHfc8gy');
  }

  enviar() {
    console.log('Função enviar() foi chamada');
    if (this.contatoForm.valid) {
      const templateParams = {
        from_name: this.contatoForm.value.nome,
        from_email: this.contatoForm.value.email,
        message: this.contatoForm.value.mensagem
      };

      emailjs.send(
        'service_8eddmav', //service
        'template_wcezbb9', //template
        templateParams,
        'Gxhd3YDu7ljHfc8gy' //public
      ).then(() => {
        //alert('Mensagem enviada com sucesso!');
        this.dialog.open(MsgContatoSucesso, {
          width: '400px',
          panelClass: 'custom-modal'
        });
        this.contatoForm.reset();
      }).catch((error) => {
        console.error('Erro ao enviar', error);
        //alert('Ocorreu um erro ao enviar. Tente novamente mais tarde.');
        this.dialog.open(MsgContatoErro, {
          width: '400px',
          panelClass: 'custom-modal'
        });
      });
    }
  }

  limpar() {
    this.contatoForm.reset();
  }

  cancelar() {
    this.router.navigate(['/']);
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
