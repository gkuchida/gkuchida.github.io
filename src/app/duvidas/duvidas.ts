import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-duvidas',
  imports: [CommonModule, RouterModule],
  templateUrl: './duvidas.html',
  styleUrl: './duvidas.css'
})
export class Duvidas {
  showBackToTop = false;
  duvidas : { pergunta: string; resposta: SafeHtml; aberto: boolean }[];
  constructor(private sanitizer: DomSanitizer) {
    this.duvidas = [
      {
      pergunta: 'O que é Soft?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Soft é um tecido leve, macio e aconchegante.O soft é ideal para dias fresquinhos. <br>
      Ele proporciona conforto sem pesar, sendo ótimo para o uso diário ou passeios em climas amenos.<br>
      Além de sua maciez, o tecido soft também é bastante prático: ele não amassa com facilidade, seca rápido e pode ser lavado na máquina, o que o torna uma escolha popular para
      produtos que precisam de cuidado prático e frequente.
      `),
      aberto: false
    },
    {
      pergunta: 'O que é Fleece?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Fleece é um tecido mais encorpado que o soft. O fleece é excelente para os dias frios. <br>
      Tem toque macio e mantém o calor por mais tempo, protegendo seu pet com muito conforto no inverno. Uma das principais vantagens do fleece, além do isolamento térmico,
      é sua resistência à água e secagem rápida, o que o torna ideal para atividades ao ar livre. <br>
      Além disso, ele é mais durável e resistente a bolinhas (pilling) do que a maioria dos tecidos soft.
      `),
      aberto: false
    },
    {
      pergunta: 'Quais os tecidos disponíveis?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Trabalhamos com uma variedade de tecidos selecionados para garantir o máximo de conforto e qualidade em todas as estações do ano.
      A disponibilidade pode variar conforme a coleção e o período sazonal.<br>
      Para a estação fria (inverno), priorizamos tecidos que oferecem excelente isolamento térmico, maciez e aconchego. Nossas peças podem ser confeccionadas em:
        <ul>
          <li><strong>Soft e Fleece:</strong> Tecidos de poliéster conhecidos por sua leveza, toque aveludado e alta capacidade de reter o calor. Ideais para blusas, pijamas e cobertores.</li>
          <li><strong>Microsoft:</strong> Uma versão ainda mais leve e macia do soft, perfeita para roupas de bebês e peças que exigem um toque mais suave.</li>
          <li><strong>Pele de Carneiro Sintética (Carapinha):</strong> Tecido com textura que imita a lã de carneiro, usado em revestimentos internos de casacos e coletes.</li>
        </ul>
      <p>
          Além disso, também podemos ter em nossa linha de produtos outros tecidos populares como <strong>moletinho</strong> e <strong>jeans</strong>, dependendo do design e funcionalidade da peça.
      </p>
        <p>
          A escolha final do tecido para o seu pedido será confirmada no momento da sua compra. Para mais detalhes, consulte a descrição de cada produto em nossa loja.
        </p>
      `),
      aberto: false
    },
    {
      pergunta: 'Como escolher um modelo?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Para criar uma peça personalizada para o seu pet, siga este passo a passo simples:<br>
      <ul>
      <li>Acesse o menu <strong>"Monte o seu Pedido"</strong>: Navegue por nossa seleção de modelos e encontre o que mais lhe agrada.</li>
      <li><strong>Informe as medidas:</strong> Clique no botão do modelo escolhido. Você será redirecionado para a página onde deverá informar as medidas do seu pet, garantindo um caimento perfeito.</li>
      <li><strong>Confirme seu pedido:</strong> Após preencher as medidas, clique no botão para ir à página de confirmação.</li>
      <li><strong>Aguarde nosso contato:</strong> Ao confirmar, suas informações serão enviadas diretamente para nossa equipe via WhatsApp. Retornaremos o mais breve possível para apresentar as opções de tecidos e estampas disponíveis, um orçamento prévio e a estimativa de entrega.</li>
      </ul>
      <p>Estamos aqui para ajudar você a criar a peça perfeita para o (a) seu (sua) melhor amigo (a)!</p>
      `),
      aberto: false
    },
    {
      pergunta: 'Como escolher o tecido?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Depois de confirmar o modelo e as medidas do seu pet e enviar as informações para nós via WhatsApp, é hora de escolher o tecido! <br>
      Nossa equipe entrará em contato para mostrar as opções de tecidos e estampas disponíveis para a peça que você selecionou.
      Você pode escolher a que mais gostar e nos informar pelo próprio WhatsApp.<br>
      Em seguida, confirmaremos sua escolha, apresentaremos um orçamento prévio e a estimativa de entrega para que você finalize o seu pedido. Simples assim!
      `),
      aberto: false
    },
    {
      pergunta: 'Como medir meu pet?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Para garantir que a roupa do seu pet tenha o melhor caimento possível, é fundamental tirar as medidas com a máxima precisão.<br>
      Siga atentamente as instruções na imagem para medir cada parte do corpo do seu pet. Um caimento perfeito garante não apenas o conforto, mas também a segurança do (a) seu (sua) melhor amigo (a).<br>
      <img src="https://i.ibb.co/Rkgm8PS4/medidas.jpg" alt="Como medir meu pet" style="width: 350px; height: 350px; border-radius: 8px; display: block; margin: 0 auto;">
      `),
      aberto: false
    },
    {
      pergunta: 'Gostei de um modelo mas não é a cor que eu quero.',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Se você gostou de um modelo, mas não encontrou o tamanho ou a cor ideal, não se preocupe! Você pode fazer um pedido personalizado.<br>
      Basta nos enviar uma mensagem pelo WhatsApp, informando:
      <ul>
        <li>O modelo que você gostou.</li>
        <li>As medidas do seu pet.</li>
      </ul>
      Em seguida, nossa equipe irá retornar com as opções de tecidos e estampas disponíveis para você escolher e criar a peça perfeita para seu (sua) melhor amigo (a).
      `),
      aberto: false
    },
    {
      pergunta: 'Gostei de um modelo mas não é o tamanho que eu quero.',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Se você gostou de um modelo, mas não encontrou o tamanho ou a cor ideal, não se preocupe! Você pode fazer um pedido personalizado.<br>
      Basta nos enviar uma mensagem pelo WhatsApp, informando:
      <ul>
        <li>O modelo que você gostou.</li>
        <li>As medidas do seu pet.</li>
      </ul>
      Em seguida, nossa equipe irá retornar com as opções de tecidos e estampas disponíveis para você escolher e criar a peça perfeita para seu (sua) melhor amigo (a).
      `),
      aberto: false
    },
    {
      pergunta: 'Não quero mostrar meu Whatsapp.',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Não se preocupe! Você pode fazer um pedido sob medida.<br>
      Basta nos informar o nome do modelo desejado e as medidas do seu pet (pescoço, tórax e comprimento) por um dos canais abaixo:
      <ul>
        <li>Instagram: <strong>@artesfocinhos</strong></li>
        <li>Email: <strong>artesfocinhos@gmail.com</strong></li>
      </ul>
      Nossa equipe entrará em contato para apresentar as opções de tecidos e estampas disponíveis e finalizar seu pedido.
      `),
      aberto: false
    },
    {
      pergunta: 'Quais os canais para fazer um pedido?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Você pode fazer o seu pedido através dos seguintes canais: <br>
      <ul>
        <li> WhatsApp:<strong> (41) 99921-8178</strong></li>
        <li> Site:<strong>  https://artesfocinhos.wixsite.com/artesfocinhos</strong></li>
        <li> Instagram:<strong> @artesfocinhos</strong></li>
        <li> E-mail:<strong> artesfocinhos@gmail.com</strong></li>
      </ul>
      `),
      aberto: false
    },
    {
      pergunta: 'Como saber o valor de um modelo que gostei?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Se você gostou de um modelo e quer saber o valor antes de comprar, é só mandar uma mensagem no nosso WhatsApp.<br>
      Para que possamos fazer um orçamento mais preciso, por favor, envie também as medidas do seu pet junto com o modelo que você gostou.
      `),
      aberto: false
    },
    {
      pergunta: 'O que altera o valor de um pedido?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Geralmente, o valor final do seu pedido fica muito próximo do orçamento inicial que passamos.<br>
      O valor pode ser alterado se, na etapa de finalização, for solicitada alguma mudança no pedido, como:
      <ul>
        <li>Troca de tecido ou estampa: Se a escolha for por um material de custo diferente.</li>
        <li>Alteração nas medidas: Se as medidas finais do pet exigirem mais material.</li>
        <li>Adição de detalhes: Se você pedir algum acréscimo ou personalização extra.</li>
      </ul>
      <strong>Qualquer alteração será informada e confirmada com você antes da produção.</strong>
      `),
      aberto: false
    },
    {
      pergunta: 'Como é feita a entrega?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Realizamos entregas para todo o Brasil e, na cidade de Curitiba, com opções personalizadas para sua comodidade.<br>
      <ul>
        <li><strong>Para todo o Brasil:</strong> Enviamos seu pedido com segurança pelos Correios.</li>
        <li><strong>Para Curitiba: </strong>Podemos combinar a entrega via Uber, com o valor e horário a serem acordados.</li>
        <li><strong>Retirada no local:</strong>Prefere buscar pessoalmente? Sua encomenda estará pronta para retirada no local.</li>
      </ul>
      `),
      aberto: false
    },
    {
      pergunta: 'Quantos dias demora a entrega de um produto sob medida/sob encomenda?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Nossas peças são confeccionadas sob medida, por isso, a produção segue a ordem de chegada dos pedidos.<br>
      O prazo estimado para a confecção é de <strong>2 a 5 dias úteis</strong>, mas o tempo exato será confirmado com você no momento da finalização do seu pedido.
      `),
      aberto: false
    },
    {
      pergunta: 'Qual a taxa de entrega?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      O valor da entrega depende da forma de envio escolhida:
      <ul>
        <li><strong>Correios:</strong> A taxa de envio é calculada de acordo com o seu CEP e a modalidade de entrega (PAC ou SEDEX). Como estamos localizados em Curitiba, Paraná, o valor pode variar conforme a distância.</li>
        <li><strong>Outras formas de envio:</strong> Para entregas em Curitiba via Uber, o valor é determinado pela plataforma e confirmado com você antes do envio.</li>
        <li><strong>Retirada no local:</strong> Se preferir, você pode retirar o seu pedido em nosso endereço em Curitiba, sem nenhum custo adicional.</li>
      </ul>
      `),
      aberto: false
    },
    {
      pergunta: 'Como solicitar itens da costura criativa?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Para fazer seu pedido, é muito simples! Basta nos enviar uma mensagem pelo WhatsApp com o nome do produto que você deseja.<br>
      Em seguida, responderemos com as opções de tecidos e estampas disponíveis para que você escolha a sua preferida.
      `),
      aberto: false
    },
    {
      pergunta: 'Quantos dias demora a entrega de um produto sob encomenda?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Nossas peças são confeccionadas sob medida, por isso, a produção segue a ordem de chegada dos pedidos.<br>
      O prazo estimado para a confecção é de <strong>2 a 5 dias úteis</strong>, mas o tempo exato será confirmado com você no momento da finalização do seu pedido.
      `),
      aberto: false
    },
    {
      pergunta: 'Como fazer para sugerir a confecção de um produto?',
      resposta: this.sanitizer.bypassSecurityTrustHtml(`
      Adoramos novas ideias! Se você tem uma sugestão para um produto, basta nos enviar uma imagem para que possamos avaliar a viabilidade de confecção.<br>
      Você pode enviar sua sugestão por qualquer um de nossos canais:
      <ul>
        <li><strong>WhatsApp:</strong> (41) 99921-8178</li>
        <li><strong>E-mail:</strong> artesfocinhos@gmail.com</li>
        <li><strong>Instagram:</strong> @artesfocinhos</li>
      </ul>
      Nossa equipe retornará o contato assim que possível.
      `),
      aberto: false
    },

  ];
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showBackToTop = scrollTop > 300;
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  toggleDuvidas(index: number) {
    this.duvidas.map((duvida,index)=>{
      duvida.aberto = false
    });
    this.duvidas[index].aberto = !this.duvidas[index].aberto;
  }

}
const func = ()=>{};
