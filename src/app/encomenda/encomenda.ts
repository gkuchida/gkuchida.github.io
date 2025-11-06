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

  ngOnInit(): void {
  const nomeParam = this.route.snapshot.paramMap.get('nome');
  if (nomeParam) {
    const nomeNormalizado = this.normalizeString(nomeParam.replace(/-/g, ' '));
    const encontrado = this.produtos.find(p => this.normalizeString(p.nome) === nomeNormalizado);
    if (encontrado) {
      this.abrirDetalhes(encontrado);
      this.scrollToTop();
    }
  }
}

normalizeString(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
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
