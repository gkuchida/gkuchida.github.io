import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MsgErro } from '../msg-erro/msg-erro';
import { EncomendaService, ProdutoSelecionado } from '../services/encomenda.service';
import { Pipe } from '@angular/core';

interface ProdutoEncomenda {
  nome: string;
  tecidos: string[];
  imagens: string[];
  descricao: string[];
  acabamento: string[];
}

export const prod_encomenda: ProdutoEncomenda[] = [
  {
    nome: 'Básica',
    tecidos: ['Soft', 'Fleece', 'Moletom'],
    acabamento: ['Ribana', 'Mesmo tecido'],
    imagens: [
      'https://i.ibb.co/FLsGfrW5/Basica-Fte.png',
      'https://i.ibb.co/gMj637z5/Basica-Verso.png',
      'https://i.ibb.co/rX1PmB0/diadia.png'
    ],
    descricao:['<strong>Roupa Básica</strong>: A peça essencial para o dia a dia. Versátil, prática e oferece aconchego total sem restringir o movimento.',
        'Tecidos Disponíveis:',
        '• <strong>Soft</strong>: Leve e macio, ideal para meia estação.',
        '• <strong>Fleece</strong>: Máximo conforto térmico para o inverno rigoroso.',
        '• <strong>Moletom</strong>: Clássico e robusto, oferece aquecimento e estrutura.',
        'Acabamentos:',
        '• <strong>Ribana</strong>: Elástico, ajusta suavemente as extremidades para um visual esportivo.',
        '• <strong>Próprio Tecido</strong>: Visual limpo e minimalista, mantendo a uniformidade da peça.']
  },
  {
    nome: 'Vestido Raglan',
    tecidos: ['Soft', 'Fleece', 'Moletom'],
    acabamento: ['Ribana', 'Mesmo tecido'],
    imagens: [
      'https://i.ibb.co/9fc0Vjb/Vestido-Raglan-FTE.png',
      'https://i.ibb.co/GfyPvzyd/Vestido-Raglan-Verso.png',
      'https://i.ibb.co/Pvy73vD3/Vestido-Raglan-IA.png'
    ],
    descricao:['O <strong>Vestido Raglan</strong> é uma peça única e charmosa, combinando a praticidade de uma blusa com o charme de uma saia.',
        'Com mangas, oferece cobertura extra e aquecimento, sendo perfeito para a meia estação e dias mais frios.',
        'O design Raglan proporciona um caimento moderno e confortável, garantindo total liberdade de movimento.',
        'Tecidos Disponíveis:',
        '• <strong>Soft</strong>: Leve e macio, ideal para meia estação.',
        '• <strong>Fleece</strong>: Máximo conforto térmico para o inverno rigoroso.',
        '• <strong>Moletom</strong>: Clássico e robusto, oferece aquecimento e estrutura.',
        'Acabamentos:',
        '• <strong>Ribana</strong>: Elástico, ajusta suavemente as extremidades para um visual esportivo.',
        '• <strong>Próprio Tecido</strong>: Visual limpo e minimalista, mantendo a uniformidade da peça.'],
  },
  {
    nome: 'Vestido Regata',
    tecidos: ['Soft', 'Fleece', 'Moletom'],
    acabamento: ['Ribana', 'Mesmo tecido'],
    imagens: [
      'https://i.ibb.co/cSJvgs8N/Vestido-Regata-FTE.png',
      'https://i.ibb.co/ycTWpVrH/Vestido-Regata-Verso.png',
      'https://i.ibb.co/hRd38Jbr/Vestido-Regata-IA.png'
    ],
    descricao:['O <strong>Vestido Regata</strong> é ideal para quem busca conforto e frescor sem abrir mão do estilo.',
        'Com o design <strong>sem mangas</strong>, é perfeito para ambientes internos aquecidos, dias de sol ou como base para outras camadas.',
        'Oferece um ajuste suave e um caimento leve que não restringe os movimentos.',
        'Tecidos Disponíveis:',
        '• <strong>Soft</strong>: Leve e macio, ideal para meia estação.',
        '• <strong>Fleece</strong>: Máximo conforto térmico para o inverno rigoroso.',
        '• <strong>Moletom</strong>: Clássico e robusto, oferece aquecimento e estrutura.',
        'Acabamentos:',
        '• <strong>Ribana</strong>: Elástico, ajusta suavemente as extremidades para um visual esportivo.',
        '• <strong>Próprio Tecido</strong>: Visual limpo e minimalista, mantendo a uniformidade da peça.',
      ],
  },
  {
    nome: 'Blusa Raglan',
    tecidos: ['Soft', 'Fleece', 'Moletom'],
    acabamento: ['Ribana', 'Mesmo tecido'],
    imagens: [
      'https://i.ibb.co/8DfZ0msC/Blusa-Raglan-Fte.png',
      'https://i.ibb.co/Cs8M9q5L/Blusa-Raglan-Verso.png',
      'https://i.ibb.co/7Nj1p6pk/Raglan-IA.png'
    ],
    descricao:['A <strong>Blusa Raglan</strong> combina o máximo conforto com um toque esportivo e moderno.',
        'O design de mangas com corte diagonal (Raglan) garante um ajuste superior nos ombros e permite a combinação de <strong>cores contrastantes</strong>.',
        'Ideal para uso diário, oferecendo aquecimento suave e total liberdade de movimento.',
        'Tecidos Disponíveis:',
        '• <strong>Soft</strong>: Leve e macio, ideal para meia estação.',
        '• <strong>Fleece</strong>: Máximo conforto térmico para o inverno rigoroso.',
        '• <strong>Moletom</strong>: Clássico e robusto, oferece aquecimento e estrutura.',
        'Acabamentos:',
        '• <strong>Ribana</strong>: Elástico, ajusta suavemente as extremidades para um visual esportivo.',
        '• <strong>Próprio Tecido</strong>: Visual limpo e minimalista, mantendo a uniformidade da peça.',
      ],
  },
  {
    nome: 'Capa Dupla Face',
    tecidos: ['Soft + Fleece','Soft + Microsoft', 'Soft + Pele', 'Fleece + Fleece','Fleece + Pele', 'Fleece + Microsoft', 'Jeans + Soft', 'Jeans + Microsoft', 'Jeans + Fleece', 'Jeans + Pele', 'Jeans + Moletom', 'Moletom + Soft', 'Moletom + Fleece', 'Moletom + Pele'],
    acabamento:[],
    imagens: [
      'https://i.ibb.co/FLcHXv8C/Jaqueta-Soft-Costas.png',
      'https://i.ibb.co/7d19zCWF/Capa-DF-Verso.png',
      'https://i.ibb.co/21VDJNcX/Capa-IA.png'
    ],
    descricao:['A <strong>Capa Dupla Face</strong> é a peça mais versátil, oferecendo dois looks e duas camadas de proteção em uma só.',
        '<strong>Fechamento Seguro:</strong> Possui ajuste prático e resistente com <strong>velcro no pescoço e no tórax</strong>, facilitando o vestir sem incomodar.',
        'Ideal para o frio, combinando alta versatilidade e excelente proteção térmica.',
        'Disponível nas seguintes combinações:',
        '• Soft + Fleece',
        '• Soft + Microsoft',
        '• Soft + Pele',
        '• Fleece + Fleece',
        '• Fleece + Pele',
        '• Fleece + Microsoft',
        '• Jeans + Soft',
        '• Jeans + Microsoft',
        '• Jeans + Fleece',
        '• Jeans + Pele',
        '• Jeans + Moletom',
        '• Moletom + Soft',
        '• Moletom + Fleece',
        '• Moletom + Pele'],
  },
  {
    nome: 'Capa Veste Fácil',
    tecidos: ['Soft + Fleece','Soft + Microsoft', 'Soft + Pele', 'Fleece + Fleece','Fleece + Pele', 'Fleece + Microsoft', 'Jeans + Soft', 'Jeans + Microsoft', 'Jeans + Fleece', 'Jeans + Pele', 'Jeans + Moletom', 'Moletom + Soft', 'Moletom + Fleece', 'Moletom + Pele'],
  acabamento: [],
    imagens: [
      'https://i.ibb.co/WW9bXSbJ/Capa-VF-Fte.png',
      'https://i.ibb.co/G3MdCjfs/Capa-VF-Verso.png',
      'https://i.ibb.co/jkxzD9Jq/Capa-VF-IA.png'
    ],
    descricao:['A <strong>Capa Veste Fácil</strong> foi pensada para o máximo conforto e praticidade no vestir.',
        'É o modelo ideal para <strong>cães idosos</strong> ou aqueles que têm dificuldade ou não gostam de esticar as patas, pois só precisa passar pela cabeça e fechar no tórax com o velcro.',
        'Protege eficientemente a região do peito e do tronco, mantendo o aquecimento.',
        'Modelo Dupla Face, disponível em diversas combinações de tecidos:',
        '• Soft + Fleece',
        '• Soft + Microsoft',
        '• Soft + Pele',
        '• Fleece + Fleece',
        '• Fleece + Pele',
        '• Fleece + Microsoft',
        '• Jeans + Soft',
        '• Jeans + Microsoft',
        '• Jeans + Fleece',
        '• Jeans + Pele',
        '• Jeans + Moletom',
        '• Moletom + Soft',
        '• Moletom + Fleece',
        '• Moletom + Pele'],
  },
  {
    nome: 'Jaqueta Dupla Face',
    tecidos: ['Soft + Fleece','Soft + Microsoft', 'Soft + Pele', 'Fleece + Fleece','Fleece + Pele', 'Fleece + Microsoft', 'Jeans + Soft', 'Jeans + Microsoft', 'Jeans + Fleece', 'Jeans + Pele', 'Jeans + Moletom', 'Moletom + Soft', 'Moletom + Fleece', 'Moletom + Pele'],
    acabamento:[],
    imagens: [
      'https://i.ibb.co/NXxJHdD/Jaqueta-Fte.png',
      'https://i.ibb.co/0yf26srW/Jaqueta-Verso.png',
      'https://i.ibb.co/HpkqsQQ0/Jaqueta-IA.png'
    ],
    descricao:['A <strong>Jaqueta Dupla Face</strong> é o modelo que oferece <strong>cobertura e aquecimento completo</strong> para os dias mais frios.',
        'Permite <strong>dois estilos em uma só peça</strong>, dobrando a vida útil e a versatilidade.',
        'Possui <strong>fechamento prático e seguro com velcro ajustável no peito</strong>, garantindo um ótimo ajuste.',
        'Disponível em diversas combinações Dupla Face para diferentes níveis de aquecimento e estilo:',
        '• Soft + Fleece',
        '• Soft + Microsoft',
        '• Soft + Pele',
        '• Fleece + Fleece',
        '• Fleece + Pele',
        '• Fleece + Microsoft',
        '• Jeans + Soft',
        '• Jeans + Microsoft',
        '• Jeans + Fleece',
        '• Jeans + Pele',
        '• Jeans + Moletom',
        '• Moletom + Soft',
        '• Moletom + Fleece',
        '• Moletom + Pele'],
  },
  {
    nome: 'Capa de chuva',
    tecidos: ['Nylon 70 Azul', 'Nylon 70 Vermelho'],
    acabamento:[],
    imagens: [
      'https://i.ibb.co/fzDb0X3n/Capa-Vermelha-M-Fte.png',
      'https://i.ibb.co/C3KCBwWR/Capa-Vermelha-M-Costas.png',
      'https://i.ibb.co/M5sYPf4f/Capa-M-IA.png'
    ],
    descricao:['Feita com o <strong>Nylon 70</strong>, o mesmo material resistente e confiável dos guarda-chuvas que você usa, nossa capa garante total impermeabilidade contra chuvas leves e garoas. Lembre-se, ela é ideal para proteger seu pet naqueles dias chuvosos mais amenos – em tempestades muito fortes, a proteção pode ser limitada.',
      'Pensando no bem-estar e na durabilidade, a capa conta com:',
      '- Acabamento em viés de algodão: Um toque suave e reforço nas bordas para maior resistência.',
      '- Fechamento prático em velcro: Fácil de colocar e tirar, garantindo um ajuste rápido e seguro.',
      '- Abertura para guia: Todos os modelos possuem um orifício estratégico no pescoço para a passagem da guia, permitindo que você prenda a coleira ou peitoral com facilidade por baixo da capa.',
      '- Opção de Pescoço Regulável: Escolha o modelo que melhor se adapta ao seu pet. Oferecemos a opção com pescoço regulável para um ajuste mais preciso e confortável, ou o modelo fixo, se preferir a simplicidade.',
      '<strong>Dica Importante:</strong> Se a intenção for usar a capa por cima de uma roupa ou peitoral, tire as medidas do seu pet enquanto ele estiver com a roupa de baixo. Isso garante o ajuste perfeito!']
  },
  {
    nome: 'Vestido Soft com Jeans',
    tecidos:['Soft', 'Fleece', 'Moletinho'],
    acabamento:['Ribana', 'Mesmo tecido'],
    imagens: [
      'https://i.ibb.co/9H1Q3QjC/Vestido-Jeans-Fte-removebg-preview.png',
      'https://i.ibb.co/tp0Pm9hk/IMG-7036.png',
      'https://i.ibb.co/jkxS2Vh4/Vestido-jeans-IA.png'
    ],
    descricao: ['<strong>Vestido Pet:</strong> Um modelo encantador que combina charme e conforto.',
      'Ideal para quem deseja uma roupinha delicada, estilosa e com caimento perfeito, sem atrapalhar os movimentos da pet.',
      'Tecidos Disponíveis:',
      '• <strong>Soft: </strong>Super macio e quentinho, perfeito para dias frios.',
      '• <strong>Fleece: </strong>Conforto térmico reforçado, ideal para inverno intenso.',
      '• <strong>Moletinho: </strong>Leve, flexível e confortável, ideal para o dia a dia.',
      '• <strong>Jeans:</strong> Toque moderno que valoriza o visual e dá estrutura ao modelo.',
      'Acabamentos:',
      '•<strong> Saia em formato reto:</strong> Caimento bonito, simples e elegante.',
      '• <strong>Ribana: </strong>Ajuste confortável no peito e pescoço.',
      '•<strong> Barra com próprio tecido:</strong> Acabamento limpo e delicado, destacando o caimento do vestido.']
  },
  {
    nome: 'Vestido Babadinho',
    tecidos:['Soft', 'Fleece', 'Moletinho'],
    acabamento:['Ribana', 'Mesmo tecido'],
    imagens: [
      'https://i.ibb.co/Gv0TwX2f/Vestido-Babado-Fte-removebg-preview.png',
      'https://i.ibb.co/Z6ndjTrD/IMG-7037.png',
      'https://i.ibb.co/b5Wg3hcy/Vestido-Babado-IA.png'
    ],
    descricao: ['<strong>Vestido Pet:</strong> Um modelo super delicado, pensado para proporcionar aconchego e muito charme. Ideal para quem busca uma roupinha quentinha, confortável e com caimento fofo para a sua pet.',
        'Tecidos Disponíveis:',
        '• <strong>Soft: </strong>Extremamente macio e quentinho, perfeito para o inverno.',
        '• <strong>Fleece:</strong> Garante proteção térmica reforçada nos dias mais frios.',
        '• <strong>Moletinho:</strong> Leve, confortável e ótimo para meia estação.',
        'Acabamentos:',
        '• <strong>Saia com babado reto:</strong> Detalhe que deixa o visual ainda mais encantador.',
        '• <strong>Ribana:</strong> Ajuste macio e seguro nas extremidades.',
        '• <strong>Barra com próprio tecido:</strong> Acabamento limpo, delicado e com ótima estrutura.']
  },
  {
    nome: 'Vestido Tigre Jeans',
    tecidos:['Tricoline e Jeans'],
    acabamento:[],
    imagens: [
      'https://i.ibb.co/CpQp70wv/IMG-7589.png',
      'https://i.ibb.co/4ZtLtvZd/IMG-7590.png',
      'https://i.ibb.co/fdSVF6nd/Vestido-Jeans-IA.png'
    ],
    descricao: ['<strong>Vestido Pet:</strong> Uma opção elegante e atemporal para pets que adoram desfilar estilo.',
      'Confortável, leve e com caimento impecável, este vestido é perfeito para passeios, fotos e ocasiões especiais.',
      'Características do Look:',
      '•<strong> Corpo em algodão: </strong> Parte superior confeccionada em tricoline, garantindo liberdade de movimento e uso agradável no dia a dia.',
      '•<strong> Saia Jeans Estruturada:</strong> Jeans com pregas que traz sofisticação, durabilidade e um visual moderno.',
      '•<strong> Faixa Decorativa na Cintura: </strong> Detalhe contrastante que adiciona charme extra e valoriza o design.',
      '•<strong> Modelagem Confortável:</strong> Modelo frente única, fácil de vestir e ideal para pets ativos.',
      'Indicado Para:',
      'Quem busca um vestido bonito, confortável e versátil, que combina estilo com praticidade.']
  },
  {
    nome: 'Colete Natal',
    tecidos:['Tricoline Natal', 'Tricoline'],
    acabamento:[],
    descricao: ['<strong>Colete Pet: </strong>O colete perfeito para transformar qualquer momento em uma ocasião especial!',
    'Leve, confortável e cheio de personalidade, ele garante que seu pet esteja sempre pronto para encantar.',
    'Destaques do modelo:',
    '•<strong>Design Elegante:</strong> Corte moderno com visual social, ideal para fotos, passeios, eventos e comemorações.',
    '•<strong>Detalhe de Gravata:</strong> Um toque charmoso que deixa o look ainda mais especial sem pesar no visual.',
    '•<strong>Conforto Garantido:</strong> Confeccionado em tricoline, permitindo que seu pet se movimente com liberdade e aproveite o dia com tranquilidade.',
    '•<strong>Versátil para Qualquer Ocasião:</strong> Combina com temas festivos, datas especiais ou até um passeio estiloso — é uma peça que funciona o ano inteiro.',
    '•<strong>Acabamento Caprichado:</strong> Feito com cuidado em cada detalhe, garantindo beleza, durabilidade e caimento impecável.',
    'Um look elegante, fofo e confortável — perfeito para deixar seu pet ainda mais irresistível.'],
    imagens: [
      'https://i.ibb.co/JjtmtvJ6/Colete-Natal-Fte.png',
      'https://i.ibb.co/q3LmzS2r/COlete-Natal.png',
      'https://i.ibb.co/PsYbPTLZ/Colete-IA.png'
    ],
  },
  {
    nome: 'Bandana Elástico',
    tecidos:['Tricoline Natal', 'Tricoline'],
    acabamento:[],
    descricao: ['<strong>Bandana com elástico: </strong>Quer renovar o visual do seu pet com praticidade e muito estilo?',
      'Conheça a nossa Bandana Pet com Elástico, a peça perfeita para o seu amiguinho!',
      'Características e Estilo:',
      '<strong>Design Divertido e Dupla Face:</strong> Com uma estampa principal de um lado e um verso liso, você tem duas opções de estilo em uma só peça!',
      '<strong>Ajuste Perfeito com Elástico:</strong> Diga adeus aos nós! O acabamento em elástico garante um vestir fácil, seguro e super confortável, adaptando-se suavemente ao pescoço do seu pet sem apertar.',
      '<strong>Qualidade e Durabilidade:</strong>Feita com tecidos macios e resistentes, nossa bandana é ideal para o uso diário e aguenta as aventuras do seu amigão.',
      'Estilo e praticidade juntos? Só com a nossa Bandana Pet Duo!',],
    imagens: [
      'https://i.ibb.co/HLcsB12f/Bandana-El-stico-Verde-Fte.png',
      'https://i.ibb.co/wFdv2XgZ/Bandana-El-stico-Verde-Costas.png',
      'https://i.ibb.co/6R7HtRPJ/Bandana-Elastico-IA.png'
    ],
  },
  {
    nome: 'Bandana Botão',
    tecidos:['Tricoline Natal', 'Tricoline'],
    acabamento:[],
    descricao: ['<strong>Bandana com fecho de botão: </strong> Adicione um toque de estilo e personalidade com esta bandana dupla face!',
      'Uma peça versátil que oferece duas opções de look em uma só.',
      'Características e Estilo:',
      '- <strong>Dupla Face e Versátil:</strong> Oferece duas estampas, permitindo mudar o visual em segundos.',
      '-<strong>Material de Qualidade:</strong> Feita em tricoline 100% algodão, o tecido é macio e confortável, ideal para uso prolongado.',
      '- <strong>Fecho Prático e Seguro:</strong> Possui um fecho de botões de pressão, que garante um ajuste fácil, rápido e seguro, sem risco de desamarrar.',],
    imagens: [
      'https://i.ibb.co/jvCg57Qp/BPink-Fte-removebg-preview.png',
      'https://i.ibb.co/Kz5ZM3jL/BPink-Vers-removebg-preview.png',
      'https://i.ibb.co/JRsqyrdc/BPink-Tras-removebg-preview.png',
      'https://i.ibb.co/WNvxFkVw/Bandana-Fla-Pink-IA.png'
    ],
  },
];

@Component({
  selector: 'app-encomenda',
  standalone: true,
  templateUrl: './encomenda.html',
  styleUrls: ['./encomenda.css'],
  imports: [CommonModule, FormsModule]
})
export class Encomenda implements OnInit{
  produtos: ProdutoEncomenda[] = prod_encomenda;

  produtoEmDetalhe: ProdutoEncomenda | null = null;
  tecidoParaMedidas: string = '';
  acabamentoParaMedidas: string = '';

  constructor(private encomendaService: EncomendaService,
      private router: Router,
      private dialog: MatDialog,
      private route: ActivatedRoute) {}

  // ** 1. ABRIR TELA DE DETALHES **
  abrirDetalhes(produto: ProdutoEncomenda): void {
    this.produtoEmDetalhe = produto;
    this.tecidoParaMedidas = produto.tecidos.length > 0 ? produto.tecidos[0] : '';
    this.acabamentoParaMedidas = produto.acabamento.length > 0 ? produto.acabamento[0] : '';
    this.scrollToTop();
  }

  // ** 2. FECHAR TELA DE DETALHES **
  voltarALista(): void {
    this.produtoEmDetalhe = null;
    this.tecidoParaMedidas = '';
    this.acabamentoParaMedidas = '';
  }

  // ** 3. SELECIONAR E NAVEGAR PARA MEDIDAS **
  selecionarENavegar(): void {
    if (!this.produtoEmDetalhe || !this.tecidoParaMedidas) {
      this.dialog.open(MsgErro, {
        width: '400px',
        data: { mensagem: 'Por favor, selecione um tecido para continuar.' },
        panelClass: 'custom-modal'
      });
      return;
    }

    const produtoFinal: ProdutoSelecionado = {
      nome: this.produtoEmDetalhe.nome,
      tecido: this.tecidoParaMedidas,
      acabamento: this.acabamentoParaMedidas,
      imagens: this.produtoEmDetalhe.imagens
    };

    this.encomendaService.setProdutoSelecionado(produtoFinal);
    this.router.navigate(['/medidas']);
    this.voltarALista();
  }
 // 🔥 NOVO: normalizar nomes para comparar
  normalizeString(str: string): string {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  // 🔥 NOVO: remover tamanho do final ("P", "M", "G", "GG", "XG"...)
  removeTamanho(nome: string): string {
    return nome
      .replace(/-?(pp|p|m|g|gg|xg|xxg)$/i, '') // remove tamanho se vier na URL
      .trim();
  }
  ngOnInit(): void {
    const nomeParam = this.route.snapshot.paramMap.get('nome');

    if (nomeParam) {
      // converter "vestido-babadinho-p" -> "vestido babadinho"
      const nomeLimpo = this.removeTamanho(
        this.normalizeString(nomeParam.replace(/-/g, ' '))
      );

      const encontrado = this.produtos.find(p =>
        this.normalizeString(p.nome) === nomeLimpo
      );

      if (encontrado) {
        this.abrirDetalhes(encontrado);
        this.scrollToTop();
      }
    }
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
  ordenacao: string = "";

ordenarProdutos() {
  switch (this.ordenacao) {
    case "nomeAsc":
      this.produtos.sort((a, b) => a.nome.localeCompare(b.nome));
      break;

    case "nomeDesc":
      this.produtos.sort((a, b) => b.nome.localeCompare(a.nome));
      break;

    default:
      break;
  }
}
}
