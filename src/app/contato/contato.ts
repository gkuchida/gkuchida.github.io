import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import emailjs from 'emailjs-com';

@Component({
  standalone: true,
  selector: 'app-fale-conosco',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './contato.html',
  styleUrls: ['./contato.css']
})
export class Contato {
  contatoForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensagem: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  enviar() {
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
        alert('Mensagem enviada com sucesso!');
        this.contatoForm.reset();
      }).catch((error) => {
        console.error('Erro ao enviar', error);
        alert('Ocorreu um erro ao enviar. Tente novamente mais tarde.');
      });
    }
  }

  limpar() {
    this.contatoForm.reset();
  }

  cancelar() {
    this.router.navigate(['/']);
  }

}
