import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EncomendaService } from '../services/encomenda.service';
import { NegritoPipe } from '../pipe/pipe';

export const artesanato = [
  {
    nome: 'Saquinho Multiuso Artesanal tamanho G',
    descricao: '<strong>Ideal para:</strong> Presentes especiais, lembrancinhas, necessaires improvisadas, organização de pequenas peças.\n<strong>Características:</strong>\n - <i>Material de Qualidade:</i> Confeccionado em tricoline 100% algodão, um tecido leve, macio e resistente, que garante um toque agradável e maior durabilidade.\n - <i>Estampa Delicada:</i> O corpo do saquinho exibe uma linda estampa floral, combinando flores vermelhas e amarelas sobre um fundo claro, adicionando um toque de charme e delicadeza. A barra superior e o interior possui um tecido de composição discreta, em poá bege, criando um contraste sutil e elegante.\n - <i>Fecho Prático:</i> Possui um fecho em cordão vermelho vibrante, que não só proporciona um fechamento seguro e rápido, mas também adiciona um ponto de cor marcante. As pontas do cordão são arrematadas com miçangas coloridas (amarelas, laranjas e peroladas), dando um toque artesanal e divertido.\n - <i>Multiuso:</i> Ideal como embalagem de presente reutilizável, saquinho organizador para viagens, porta-bijuterias, ou para guardar itens pessoais.\n - <i>Acabamento Artesanal:</i> Peça com acabamento cuidadoso, feita à mão, garantindo exclusividade e atenção aos detalhes.\n<strong>Medidas:</strong>',
    preco: 20,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/fsfcFDQ/Saco-GG-Fte.png',
      'https://i.ibb.co/tpcvNgTq/Saco-GG-Aberto.png',
      'https://i.ibb.co/M5yJshgf/Saquinho-G-IA.png'
    ],
    observacao: '<strong>Personalize o Seu!</strong> Gostou do modelo, mas prefere outras cores ou estampas? Este saquinho é personalizável!\n<strong>Tamanhos:</strong> Podemos confeccionar em diferentes dimensões para atender à sua necessidade.\n<strong>Estampas:</strong> Disponibilizamos um catálogo variado de estampas em tricoline.\nEntre em Contato para ver as opções de estampas, tamanhos e solicitar um orçamento, chame-nos no WhatsApp! Será um prazer criar uma peça única para você.\n'
  },
  {
    nome: 'Saquinho Multiuso Artesanal tamanho P',
    descricao: '<strong>Ideal para:</strong> Presentes especiais, lembrancinhas, necessaires improvisadas, organização de pequenas peças.\n<strong>Características:</strong>\n- <i>Material de Qualidade:</i> Confeccionado em tricoline 100% algodão, um tecido leve, macio e resistente, que garante um toque agradável e maior durabilidade.\n- <i>Estampa Romântica:</i> O saquinho combina duas estampas harmoniosas: a parte inferior apresenta uma linda padronagem floral, com pequenas rosas em tons de vermelho e verde sobre um fundo rosa-claro (coral). A barra superior e o interior utilizam uma estampa de poás discretos no mesmo tom de rosa, criando uma composição doce e romântica.\n- <i>Fecho Prático:</i> Possui um fecho em cordão branco que contrasta elegantemente com o tecido, garantindo um fechamento seguro e rápido. As pontas do cordão são arrematadas com miçangas coloridas (verdes, laranjas e vermelhas), adicionando um charme artesanal e vibrante.\n - <i>Multiuso:</i> Ideal como embalagem de presente reutilizável, saquinho organizador para viagens, porta-bijuterias, ou para guardar itens pessoais.\n- <i>Acabamento Artesanal:</i> Peça com acabamento cuidadoso, feita à mão, garantindo exclusividade e atenção aos detalhes.\n<strong>Medidas:</strong>',
    preco: 10,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/jP8JZxjD/IMG-6832-removebg-preview.png',
      'https://i.ibb.co/gZnKH3Ts/IMG-6833-removebg-preview.png',
      'https://i.ibb.co/Mynbp6h0/Saquinho-P-IA.png'
    ],
    observacao:'<strong>Personalize o Seu!</strong> Gostou do modelo, mas prefere outras cores ou estampas? Este saquinho é personalizável!\n <strong>Tamanhos:</strong> Podemos confeccionar em diferentes dimensões para atender à sua necessidade.\n<strong>Estampas: </strong>Disponibilizamos um catálogo variado de estampas em tricoline.\nEntre em Contato para ver as opções de estampas, tamanhos e solicitar um orçamento, chame-nos no WhatsApp! Será um prazer criar uma peça única para você.'
  },
  {
    nome: 'Pano Multiuso - Estampa Cerejas',
    descricao: 'Adicione um charme retrô e divertido à sua cozinha com nosso pano artesanal. Perfeito para manter seus alimentos frescos e protegidos com um toque de delicadeza.\n<strong>Características e Uso Ideal:</strong>\n<i>Estampa Vibrante:</i> O tecido do barrado apresenta um padrão alegre de quadriculado amarelo e branco, com charmosas cerejas vermelhas e hastes verdes. Uma estampa clássica que ilumina qualquer ambiente!\n<i>Função Principal:</i> Devido à trama do tecido, este pano é perfeito para cobrir e proteger alimentos, como bolos, pães, frutas e massas que estão crescendo. Ajuda a manter a umidade e a afastar insetos de forma higiênica e estilosa.\n<i>Decoração e Detalhes:</i> Ideal para forrar cestas de pães, bandejas de piquenique ou simplesmente decorar sua mesa e bancada.\n<i>Presente Prático:</i> Embalado com carinho em celofane e finalizado com um laço de fita verde, é uma excelente opção para presentear com bom gosto e utilidade.\n<strong>Medidas:</strong>\n- 45 x 66 cm.',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/60htw4jK/Pano-Cereja.png',
      'https://i.ibb.co/wZsKcZ2W/Pano-Cobrir-Cerejas-removebg-preview.png',
      'https://i.ibb.co/KcXYcKy6/Pano-Cobrir-IA.png'

    ],
    observacao:'\n<i>Importante:</i> Este pano é especificamente indicado para cobrir e forrar, não sendo ideal para secar louças devido à sua trama.'
  },
  {
    nome: 'Pano Multiuso - Clássico Poá Vermelho',
    descricao: 'Adicione um toque vibrante e atemporal à sua cozinha com nosso pano artesanal. Perfeito para manter seus alimentos frescos e protegidos com o charme do design clássico.\n<strong>Características e Uso Ideal:</strong>\n<i>Estampa Clássica e Vibrante:</i> O tecido do barrado apresenta um charmoso padrão de Poá (bolinhas) brancas sobre um fundo vermelho intenso. Um visual clássico que traz alegria e destaque para qualquer mesa.\n<i>Função Principal:</i> Devido à trama do tecido, este pano é perfeito para cobrir e proteger alimentos, como bolos, pães, frutas e massas que estão crescendo. Ajuda a manter a umidade e a afastar insetos de forma higiênica e estilosa.\n<i>Decoração e Detalhes:</i> Ideal para forrar cestas de pães, bandejas de piquenique ou simplesmente decorar sua mesa e bancada.\n<i>Presente Prático:<i> Embalado cuidadosamente em celofane, finalizado com um laço de fita vermelha, é uma excelente opção para presentear com bom gosto e utilidade.\n<strong>Medidas:</strong>\n- 45 x 66 cm.',
    preco: 15,
    estoque: 1,
    imagens: [
    'https://i.ibb.co/1G05Qn6p/Pano-Bolinhas.png',
    'https://i.ibb.co/tpGfMKZX/Pano-Cobrir-Poa-removebg-preview.png',
    'https://i.ibb.co/3Yc5zfwc/Pano-Cobrir-V-IA.png'
    ],
    observacao:'<i>Importante:</i> Este pano é especificamente indicado para cobrir e forrar, não sendo ideal para secar louças devido à sua trama.'
  },
  {
    nome: 'Kit pano de prato + puxa-saco',
    descricao: 'Transforme sua cozinha com este kit charmoso e funcional, que combina eficiência na secagem de louças e organização elegante. Um conjunto artesanal perfeito para presentear ou para você!\n<i>Itens do Kit:</i>\n<strong> Pano de Prato:</strong>\n- <i>Qualidade Comprovada:</i> Confeccionado com o legítimo tecido "Pé de Galinha", conhecido pela sua trama superior que garante a máxima absorção. É a escolha ideal para enxugar louças perfeitamente, sem soltar fiapos.\n- <i>Acabamento:</i> Possui uma barra decorativa em tecido estampado com doces coloridos, trazendo um visual divertido e encantador — perfeito para quem ama uma cozinha viva e cheia de personalidade.\n<strong>Puxa-Saco:</strong>\n- <i>Estampa Alegre:</i> Produzido em tecido tricoline 100% algodão com estampa de doces e balas coloridas, que adiciona um toque de descontração e charme ao ambiente.\n- <i>Funcionalidade:</i> Ideal para manter suas sacolas plásticas organizadas de forma discreta e elegante. Possui elásticos nas aberturas para facilitar tanto a colocação quanto a retirada das sacolas.\n<strong>Charme e Praticidade em Conjunto:</strong>\nEste kit não só otimiza suas tarefas na cozinha, mas também adiciona um toque campestre e romântico à decoração. Os tecidos combinam perfeitamente, criando uma harmonia visual única.\n<strong>Medidas:</strong>\n-Pano de prato: 45 x 66 cm.\n- Puxa-saco: 21 x 52 cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/NdGQT1N7/Kit.png',
      'https://i.ibb.co/Zzjh4DMZ/PuxaSaco.png',
      'https://i.ibb.co/0pPq9tnV/Pano-Doces.png'
    ],
    observacao:''
  },
  {
    nome: 'Kit com 2 Panos de prato',
    descricao: 'Confeccionados com o autêntico tecido pé de galinha, conhecido por sua excelente qualidade, alta absorção e durabilidade, esses panos são ideais para secar louças, enxugar as mãos e auxiliar em todas as tarefas do dia a dia. Esqueça aqueles panos que não secam de verdade e soltam fiapos!\n<strong>Características do Produto:</strong>\n- <i>Pano Legítimo Pé de Galinha:</i> 100% algodão, alvejado (super branco) e com a trama tradicional que garante a melhor absorção.\n- <i>Detalhes que Encantam:</i> Cada pano é cuidadosamente finalizado com barrados em tecido de tricoline 100% algodão, trazendo estampas vivas e cheias de personalidade:\n- Um pano com divertida estampa de galinhas pretas e brancas - perfeito para quem ama um toque campestre e alegre.\n- Um pano com vibrante estampa de flores e mandalas em tons de amarelo e vermelho - que ilumina e moderniza o ambiente.\n- <i>Qualidade e Praticidade:</i> Além de lindos, são resistentes e podem ser lavados com frequência, mantendo a maciez e o poder de secagem.\nSeja para uso próprio, para presentear alguém especial ou para complementar a decoração da sua casa, este kit é a união perfeita de beleza artesanal e utilidade imbatível.\nLeve já para casa o charme e a qualidade que a sua cozinha merece!\n<strong>Medidas:</strong>\n- 45 x 66 cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/DHvNnsqG/Kit-Panos.png',
      'https://i.ibb.co/G4LxwR0x/Pano-Galinha.png',
      'https://i.ibb.co/xKHLbvgk/Pano-Mistico.png'
    ],
    observacao:''
  },
];

interface ProdutoArtesanato {
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagens: string[];
  observacao: string;
}

@Component({
  standalone: true,
  selector: 'app-artesanato',
  templateUrl: './artesanato.html',
  styleUrls: ['./artesanato.css'],
  imports: [CommonModule, FormsModule, RouterModule, NegritoPipe]
})

export class Artesanato {
  produtos: ProdutoArtesanato[] = artesanato as ProdutoArtesanato[];

  private encomendaService = inject(EncomendaService);
  private router = inject(Router);

  selecionarProduto(produto: ProdutoArtesanato): void {

    // 1. Armazena o item (opcional, mas bom para dados mais complexos)
    this.encomendaService.setArtesanatoSelecionado({ nome: produto.nome });

    // 2. Transforma o nome para URL (ex: "Pano de prato" -> "pano-de-prato")
    const nomeUrl = produto.nome
    .toLowerCase()
    .replace(/ /g, '-');

    // 3. NAVEGAÇÃO REAL
    this.router.navigate(['/artesanato', nomeUrl]);
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
