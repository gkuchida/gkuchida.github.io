import { Component, HostListener, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService, CarrinhoItem } from '../services/carrinho.service';
import { MatDialog } from '@angular/material/dialog';
import { MsgSucesso } from '../msg-sucesso/msg-sucesso';
import { FormsModule } from '@angular/forms';
import { NegritoPipe } from '../pipe/pipe';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

export interface ProdutoPronto {
  nome: string;
  tamanhos?: string[];
  descricao: string;
  preco: number;
  estoque: number;
  imagens: string [];
  observacao?: string;
  isNovidade?: boolean;
  tipo?: 'inverno'|'verao'|'meiaestacao'|'acessorios'|'artesanato'|string;
  genero?:string;
  sobMedida?:boolean;
}

export const modelosProntas =[
  {
    nome: 'Vestido em Matelassê e Jeans P',
    tamanhos: ['P'],
    descricao: '*Novidade!* \nDelicado, confortável e cheio de charme! Este vestido para pets foi confeccionado em matelassê rosa, um tecido macio e levemente estruturado que ajuda a manter seu pet quentinho e estiloso. A saia em jeans dá um toque moderno e resistente, perfeito para passeios ou fotos cheias de fofura.\nO modelo conta ainda com um lindo aplique bordado na saia, trazendo um detalhe especial que deixa a peça ainda mais encantadora.\n\n*Tecido:* Matelassado\n*Cor:* Rosa.\n*Medidas:*\nPescoço: 36 cm\nTórax: 42 cm\nComprimento: 31 cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/dwDqsmDz/Matelasse-Jeans-IA.png',
      'https://i.ibb.co/hxtxZB15/Matelasse-Jeans-Costas.png',
      'https://i.ibb.co/rRm9jxtt/Matelasse-Jeans-Ladp.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Básica Amarela M',
    tamanhos: ['M'],
    descricao: 'A blusa básica em fleece é perfeita para manter seu pet aquecido nos dias frios, unindo conforto, praticidade e muito charme.\nConfeccionada em tecido fleece macio e aconchegante, proporciona um toque suave e agradável, ideal para o uso diário. Sua modelagem confortável permite liberdade de movimento, deixando seu companheiro à vontade para brincar, descansar ou passear.\nA estampa em tons de amarelo com detalhes delicados traz um visual encantador, enquanto o acabamento em ribana azul garante um ajuste confortável e bonito ao corpo do pet.\n\n*Tecido:* Fleece\n*Cor:* Amarelo com estampas coloridas.\n*Acabamento:* Ribana azul.\n\n*Medidas:*\n• Pescoço: até 32 cm\n• Tórax: 53 cm\n• Comprimento: 44 cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/BKn607Fb/Basica-Amarela-IA.png',
      'https://i.ibb.co/FNrDSGT/Basica-M-Costas.png',
      'https://i.ibb.co/hxSwk9fc/Basica-M-Fte.png',
      'https://i.ibb.co/qMGthjHR/Basica-M-Lat.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Básica Rosa Fadas M',
    tamanhos: ['M'],
    descricao: 'A blusa básica em fleece é perfeita para manter seu pet aquecido nos dias frios, unindo conforto, praticidade e muito charme.\nConfeccionada em tecido fleece macio e aconchegante, proporciona um toque suave e agradável, ideal para o uso diário. Sua modelagem confortável permite liberdade de movimento, deixando seu companheiro à vontade para brincar, descansar ou passear.\nA estampa em tons de rosa com detalhes delicados traz um visual encantador, enquanto o acabamento em ribana pink garante um ajuste confortável e bonito ao corpo do pet.\n\n*Tecido:* Fleece\n*Cor:* Rosa com estampas brancas.\n*Acabamento:* Ribana pink.\n\n*Medidas:*\n• Pescoço: até 32 cm\n• Tórax: 53 cm\n• Comprimento: 44 cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/nKKHr38/Basica-Fadas-IA.png',
      'https://i.ibb.co/4RT5bFww/Basica-M-Rosa-Costas.png',
      'https://i.ibb.co/r2FWw4zg/Basica-M-Rosa-Fte.png',
      'https://i.ibb.co/nMv0NKKT/Basica-M-Rosa-Lat.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Básica Verde Dinos P',
    tamanhos: ['P'],
    descricao: 'A blusa básica em fleece é perfeita para proteger do frio leve, mantendo seu companheiro sempre quentinho e confortável.\nConfeccionada em tecido fleece macio e leve, a peça proporciona um toque suave e agradável, ideal para uso diário. A modelagem simples e confortável permite liberdade de movimento, deixando seu pet à vontade para brincar, descansar ou passear.\nCom estampa divertida e acabamento delicado, é uma peça prática que combina conforto e charme.\n\n*Tecido:* Fleece\n*Cor:* Verde-limão com estampa de dinossauros coloridos\n*Acabamento:* Ribana na cor vermelha\n\n*Medidas:*\n Pescoço: até 28cm\n Tórax: 32cm\nComprimento: 40cm.',
    preco: 25,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/gLVpTTg5/Basica-P-IA.png',
      'https://i.ibb.co/LD8RSygT/Basica-P-Costas.png',
      'https://i.ibb.co/mCb3m63t/Basica-P-Fte.png',
      'https://i.ibb.co/hFGCqbHs/Basica-P-Lat.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Capa Veste Fácil M',
    tamanhos: ['M'],
    descricao: 'A capinha veste fácil em fleece é perfeita para manter seu pet protegido e confortável nos dias frios, sem complicação na hora de vestir.\nCom modelagem prática e confortável, a peça se ajusta ao corpo de forma suave, permitindo liberdade de movimento para brincar, passear ou descansar com muito aconchego.\nConfeccionada em tecido fleece com revestimento em pele artificial extremamente macio ajudam a manter o calor corporal, deixando seu companheiro ainda mais quentinho. A estampa divertida em tons pastel traz um visual delicado e encantador, ideal para pets cheios de personalidade.\n*Tecido:* Fleece\n*Revestimento:* Pele artificial\n*Fechamento:* velcro\n\n*Medidas:*\n• Pescoço: até 36 cm\n• Tórax: 43-50 cm\n• Comprimento: 38 cm',
    preco: 35,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/KpJMxSv5/VF-Rosa-IA.png',
      'https://i.ibb.co/8n9dphPc/IMG-9012.png',
      'https://i.ibb.co/8n9dphPc/IMG-9012.png',
      'https://i.ibb.co/fYjYmftx/VF-M-Lat.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Capa Veste Fácil P',
    tamanhos: ['P'],
    descricao: 'A capinha veste fácil em fleece é perfeita para manter seu pet protegido e confortável nos dias frios, sem complicação na hora de vestir.\nCom modelagem prática e confortável, a peça se ajusta ao corpo de forma suave, permitindo liberdade de movimento para brincar, passear ou descansar com muito aconchego.\nConfeccionada em tecido fleece com revestimento em microsoft anti piling, ajudam a manter o calor corporal, deixando seu companheiro ainda mais quentinho. A estampa espacial em tons de azul-marinho, com foguetes, planetas e estrelas, traz um visual divertido e cheio de personalidade.\n*Tecido:* Fleece\n*Revestimento:* Microsoft anti piling\n*Fechamento:* velcro\n\n*Medidas:*\n• Pescoço: até 34 cm\n• Tórax: 38-47 cm\n• Comprimento: 32 cm',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/xSZW9Fpt/VF-P-IA.png',
      'https://i.ibb.co/LDRwBSr3/VF-P-Costas.png',
      'https://i.ibb.co/Qzxmwjt/VF-P-Fte.png',
      'https://i.ibb.co/C3DYThwq/VF-P-Lat.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Básica Amarelo P',
    tamanhos: ['P'],
    descricao: '*Novidade!* \nConforto, praticidade e muito estilo para os dias mais fresquinhos! Esta blusa básica para pets é confeccionada em soft amarelo estampado com aviõezinhos, um tecido macio, leve e quentinho, perfeito para manter seu pet confortável no dia a dia.\nO modelo possui ribanas vermelhas no pescoço e nas cavas, que ajudam no ajuste ao corpinho e dão um toque alegre à peça. Além disso, conta com abertura nas costas para passagem da guia, permitindo usar com peitoral sem precisar tirar a roupinha na hora do passeio.\n\n*Tecido:* Soft\n*Cor:* Amarelo com desenhos de aviões\n*Ribanas:* Vermelhas\n*Medidas:*\nPescoço: 30 cm\nTórax: 50 cm\nComprimento: 33 cm.',
    preco: 25,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/qY8hdysP/Basica-Amarela-IA.png',
      'https://i.ibb.co/hRwzFzLn/Basica-Amarela-P-Costas.png',
      'https://i.ibb.co/hRwzFzLn/Basica-Amarela-P-Fte.png',
      'https://i.ibb.co/hRwzFzLn/Basica-Amarela-P-Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Capa VF Fleece P',
    tamanhos: ['P'],
    descricao: '*Novidade!* \nConforto, praticidade e muito charme para o seu pet! Esta capa é confeccionada em fleece macio e quentinho, ideal para proteger do frio sem pesar ou incomodar.\nO modelo tipo capa é perfeito para pets que não gostam de levantar as patinhas na hora de se vestir, pois basta colocar sobre as costas e ajustar. Possui fechamento prático com ajuste no pescoço, garantindo melhor encaixe e conforto.\nA estampa fofa de pandas, nuvens e estrelinhas deixa a peça ainda mais charmosa, enquanto o fleece mantém seu pet aquecido nos dias frios.\n\n*Tecido:* Fleece com revestimento também em Fleece\n*Cor:* Verde claro com desenhos de pandas\n*Medidas:*\nPescoço: 35 a 38 cm\nTórax: 44 a 54 cm\nComprimento: 35 cm.',
    preco: 30,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/1GjhVGtP/Capa-VF-P-IA.png',
      'https://i.ibb.co/pjhYWLWs/Capa-VF-P-Costas.png',
      'https://i.ibb.co/v6SxLTPg/Capa-VF-P-Fte.png',
      'https://i.ibb.co/RT6pfW8C/Capa-VF-P-Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Básica Branco P',
    tamanhos: ['P'],
    descricao: '*Novidade!* \nUma peça quentinha e cheia de fofura para deixar seu pet confortável nos dias mais fresquinhos! Esta blusa básica é confeccionada em soft macio, um tecido leve e aconchegante que ajuda a manter seu pet aquecido sem atrapalhar os movimentos.\nA estampa divertida traz desenhos inspirados no fundo do mar, com águas-vivas, peixinhos e elementos marinhos em tons suaves, deixando a roupinha ainda mais charmosa. Além disso, conta com abertura nas costas para passagem da guia, permitindo usar com peitoral sem precisar tirar a roupinha na hora do passeio.\n\n*Tecido:* Soft\n*Cor:* Branca com desenhos de animais marinhos\n*Acabamento:* Soft\n*Medidas:*\nPescoço: 36 cm\nTórax: 50 cm\nComprimento: 33 cm.',
    preco: 25,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/KzDG8tgm/Basica-Branca-P-IA.png',
      'https://i.ibb.co/SD6wYRpn/Basica-Branca-P-Costas.png',
      'https://i.ibb.co/k63TJkC8/Basica-Branca-P-Fte.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Capa VF Soft M',
    tamanhos: ['M'],
    descricao: '*Novidade!* \nPrática, quentinha e cheia de estilo! Esta capa para pets é confeccionada em soft e aconchegante, perfeita para manter seu pet aquecido nos dias mais frios.\nO modelo tipo capa facilita muito na hora de vestir, sendo ideal para cães que não gostam de dar as patinhas ao colocar roupas. Basta posicionar sobre as costas e ajustar.\nPossui regulagem no pescoço, permitindo um encaixe confortável e seguro no corpo do pet. A estampa divertida de patinhas e ossinhos deixa a peça ainda mais charmosa e alegre.\n\n*Tecido:* Soft com revestimento em Microsoft\n*Cor:* Pink com desenhos de ossos amarelos\n*Medidas:*\nPescoço: 30 a 40 cm\nTórax: 63 a 70 cm\nComprimento: 40 cm.',
    preco: 35,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/N2Phv77T/Capa-VF-M-IA.png',
      'https://i.ibb.co/gb2frvYY/Capa-VF-M-Costas.png',
      'https://i.ibb.co/35LSHTkm/Capa-VF-M-Fte.png',
      'https://i.ibb.co/jvYcvrR2/Capa-VF-M-Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Blusa Raglan Moletom G',
    tamanhos: ['G'],
    descricao: '*Novidade!* \nA blusa raglan em moletom foi pensada para manter seu pet quentinho sem abrir mão da liberdade de movimento.\nProduzida em moletom macio e aconchegante, ela oferece um toque suave e confortável no corpo do pet. O capuz com forro estampado dá um charme especial à peça, enquanto o detalhe aplicado nas costas deixa o visual ainda mais fofo e divertido.\nO modelo raglan proporciona melhor ajuste no corpo e mais mobilidade, sendo ideal para passeios, momentos de descanso ou para deixar seu pet estiloso em qualquer ocasião.\n\n*Tecido:* Moletom\n*Cor:* Vinho\n*Medidas:*\nPescoço: 43 cm\nTórax: 58 cm\nComprimento: 43 cm.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/dJmrjyWD/Moletom-Vinho-IA.png',
      'https://i.ibb.co/qLMdQJ9x/Moletom-Vinho-Costas.png',
      'https://i.ibb.co/9LdJm7c/Moletom-Vinho-Fte.png',
      'https://i.ibb.co/dsfXFWJD/Moletom-Vinho-Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Colete Azul M',
    tamanhos: ['M'],
    descricao: '*Novidade!* \nDeixe seu pet quentinho e cheio de estilo com esse colete super elegante\nConfeccionado em tecido matelassado azul, com costuras geométricas que trazem um toque moderno e sofisticado, ele é perfeito para os dias mais fresquinhos.\nO modelo possui gola estruturada que protege o pescocinho e fechamento em velcro na parte frontal, facilitando na hora de vestir e garantindo ajuste confortável ao corpinho do seu pet. A parte interna é macia e aconchegante, proporcionando muito conforto durante o uso.\n\n*Tecido:* Matelassado\n*Cor:* Azul\n*Fechamento:* Velcro frontal\n*Medidas:*\nPescoço: 50 a 57 cm\nTórax: 56 a 67 cm\nComprimento: 43 cm.',
    preco: 35,
    estoque: 1,
    imagens: [
      'https://i.postimg.cc/GtVC4Hb8/Colete_Azul_IA.png',
      'https://i.postimg.cc/wMZp1797/Colete_Azul_Fte.png',
      'https://i.postimg.cc/hv6BXfKj/Colete_Azul_Costas.png',
      'https://i.postimg.cc/hv6BXfKX/Colete_Azul_Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Colete Rosa M',
    tamanhos: ['M'],
    descricao: '*Novidade!* \nDeixe sua pet quentinha e cheia de estilo com esse colete super elegante\nConfeccionado em tecido matelassado rosa, com costuras geométricas que trazem um toque moderno e sofisticado, ele é perfeito para os dias mais fresquinhos.\nO modelo possui gola estruturada que protege o pescocinho e fechamento em velcro na parte frontal, facilitando na hora de vestir e garantindo ajuste confortável ao corpinho da sua pet. A parte interna é macia e aconchegante, proporcionando muito conforto durante o uso.\n\n*Tecido:* Matelassado\n*Cor:* Rosa\n*Fechamento:* Velcro frontal\n*Medidas:*\nPescoço: 47 a 55 cm\nTórax: 54 a 63 cm\nComprimento: 43 cm.',
    preco: 35,
    estoque: 1,
    imagens: [
      'https://i.postimg.cc/MZFxPrVD/Colete_Rosa_IA.png',
      'https://i.postimg.cc/BZVsYwH5/Colete_Rosa_Fte.png',
      'https://i.postimg.cc/VsV1GHnq/Colete_Rosa_Costas.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Básica Amarelo M',
    tamanhos: ['M'],
    descricao: '*Novidade!* \nConforto, praticidade e muito estilo para os dias mais fresquinhos! Esta blusa básica para pets é confeccionada em soft amarelo estampado com aviõezinhos, um tecido macio, leve e quentinho, perfeito para manter seu pet confortável no dia a dia.\nO modelo possui ribanas vermelhas no pescoço e nas cavas, que ajudam no ajuste ao corpinho e dão um toque alegre à peça. Além disso, conta com abertura nas costas para passagem da guia, permitindo usar com peitoral sem precisar tirar a roupinha na hora do passeio.\n\n*Tecido:* Soft\n*Cor:* Amarelo com desenhos de aviões\n*Ribanas:* Vermelhas\n*Medidas:*\nPescoço: 35 cm\nTórax: 54 cm\nComprimento: 42 cm.',
    preco: 30,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/qY8hdysP/Basica-Amarela-IA.png',
      'https://i.ibb.co/hRwzFzLn/Basica-Amarela-P-Costas.png',
      'https://i.ibb.co/M5pGX8gy/Basica-Amarela-M-Fte.png',
      'https://i.ibb.co/hRwzFzLn/Basica-Amarela-P-Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Vestido com Cachecol M',
    tamanhos: ['M'],
    descricao: '*Novidade!* \nDeixe sua pet quentinha e ainda mais encantadora com esse vestido em soft super confortável\nO modelo combina estampa divertida e delicada na parte superior com saia lisa em tom pink vibrante, criando um visual alegre e cheio de personalidade. O charme extra fica por conta do cachecol integrado, que dá um toque especial e deixa a produção ainda mais fofa.\nConfeccionado em soft, é macio, leve e ideal para os dias mais fresquinhos, mantendo sua pet aquecida sem abrir mão do conforto. O grande diferencial é o pescoço ajustável, que permite melhor adaptação ao corpinho, garantindo encaixe confortável e seguro.\nPerfeito para passeios, fotos especiais ou para deixar o dia a dia muito mais estiloso.\n\n*Tecido:* Soft\n*Cor:* Estampa divertida com saia pink\n*Medidas:*\nPescoço: 35 a 43 cm\nTórax: 50 cm\nComprimento: 41 cm.',
    preco: 35,
    estoque: 1,
    imagens: [
      'https://i.postimg.cc/nVP2XvfX/Vestido_Cachecol.png',
      'https://i.postimg.cc/66mwj1nF/Vestido_Cachecol_Fte.png',
      'https://i.postimg.cc/kMp91hKH/Vestido_Cachecol_Costas.png',
      'https://i.postimg.cc/qB50bZy9/Vestido_Cachecol_Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Básica Xadrez G',
    tamanhos: ['G'],
    descricao: '*Novidade!* \nDeixe seu pet quentinho e confortável com essa blusa básica em fleece\nCom estampa xadrez em tons vibrantes de vermelho, azul marinho e branco, ela traz um visual clássico e estiloso para os dias mais fresquinhos. O acabamento em ribana preta na gola e nas aberturas garante melhor ajuste e um toque moderno à peça.\nConfeccionada em fleece, é super macia, leve e aconchegante, mantendo seu pet aquecido sem limitar os movimentos. O modelo é prático e fácil de vestir, ideal para o dia a dia, passeios ou momentos de descanso.\nUma peça básica, versátil e indispensável no guarda-roupa do seu pet.\n\n*Tecido:* Fleece\n*Estampa:* Xadrez em vermelho, azul marinho e branco\n*Medidas:*\nPescoço: 38 cm\nTórax: 52 cm\nComprimento: 40 cm.',
    preco: 30,
    estoque: 0,
    imagens: [
      'https://i.postimg.cc/pr4HmpPH/Basica_Xadrez_IA.png',
      'https://i.postimg.cc/1XfSRphv/Basica_G_xadrez_Fte.png',
      'https://i.postimg.cc/VvdwsjQg/Basica_G_xadrez_Costas.png',
      'https://i.postimg.cc/gjnpcvFQ/Basica_G_xadrez_Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
   {
    nome: 'Jaqueta Moletom Azul PP',
    tamanhos: ['PP'],
    descricao: '*Novidade!* \nEsta jaqueta foi desenvolvida para vestir com facilidade e manter seu companheiro aquecido nos dias mais fresquinhos.\nConfeccionada em moletom de alta qualidade, a peça conta com revestimento interno em moletinho, proporcionando um toque ainda mais macio e confortável. O fechamento em velcro no peito facilita na hora de vestir e garante um ajuste rápido e seguro.\nSeu design simples e elegante combina com qualquer ocasião, sendo perfeita para passeios, viagens ou momentos de descanso com muito conforto.\n\n\n*Tecido:* Moletom com revestimento em moletinho\n*Cor:* Azul\n*Fechamento*: Velcro\n*Medidas:*\nPescoço: 38 cm\nTórax: 38 cm\nComprimento: 27 cm.',
    preco: 35,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/LDhyYnbY/Jaqueta-Azul-IA.png',
      'https://i.ibb.co/wZcSg20C/Jaqueta-Azul-Costas.png',
      'https://i.ibb.co/ZpZqbT79/Jaqueta-Azul-Fte.png',
      'https://i.ibb.co/Zpq4s1qr/Jaqueta-Azul-Lado.png',
      'https://i.ibb.co/35dxr3qg/Jaqueta-Azul-Velcro.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Jaqueta Moletom Vermelho PP',
    tamanhos: ['PP'],
    descricao: '*Novidade!* \nA jaqueta Minnie é perfeita para deixar seu companheiro protegido nos dias mais fresquinhos, com um toque divertido e cheio de personalidade.\n\n\n*Tecido:* Moletom com revestimento em microsoft\n*Cor:* Vermelha\n*Fechamento*: Velcro\n*Medidas:*\nPescoço: 34 cm\nTórax: 46 cm\nComprimento: 31 cm.',
    preco: 35,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/dstsmBX4/Jaqueta-Minnie-IA.jpg',
      'https://i.ibb.co/Pzf574h4/Jaqueta-Minnie-Costas.png',
      'https://i.ibb.co/vvc9gg0G/Jaqueta-Minnie-Fte.png',
      'https://i.ibb.co/Df87Bd26/Jaqueta-Minnie-Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Básica Soft Verde G',
    tamanhos: ['G'],
    descricao: '*Novidade!* \nA blusa básica em soft é perfeita para proteger do frio leve, mantendo seu companheiro sempre quentinho e confortável.\nConfeccionada em tecido soft macio e leve, a peça proporciona um toque suave e agradável, ideal para uso diário. A modelagem simples e confortável permite liberdade de movimento, deixando seu pet à vontade para brincar, descansar ou passear.\nCom estampa divertida e acabamento delicado, é uma peça prática que combina conforto e charme.\n\n\n*Tecido:* Soft\n*Cor:* Verde com desenhos de animais enquadrados\n*Acabamento*: Ribana na cor vermelha\n*Medidas:*\nPescoço: 40 cm\nTórax: 54 cm\nComprimento: 42 cm.',
    preco: 35,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/v63YC4Ff/B-sica-Verde-IA.jpg',
      'https://i.ibb.co/whq7nLwW/B-sica-Verde-Costas.png',
      'https://i.ibb.co/ksZ6PrWh/B-sica-Verde-Fte.png',
      'https://i.ibb.co/MxRCkfYN/B-sica-Verde-Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Básica Soft Vermelho G',
    tamanhos: ['G'],
    descricao: '*Novidade!* \nEsta blusa em soft foi desenvolvida para manter seu companheiro quentinho nos dias mais fresquinhos, com um diferencial que garante ainda mais conforto: regulagem no pescoço.\nConfeccionada em soft macio e aconchegante, a peça proporciona um toque suave e agradável, ideal para o uso diário. A regulagem no pescoço permite ajustar melhor ao corpo do pet, oferecendo mais segurança e um caimento confortável.\nCom modelagem leve e confortável, ela permite liberdade de movimento para brincar, passear ou descansar.\n\n\n*Tecido:* Soft\n*Cor:* Vermelho com desenhos de caminhões\n*Acabamento*: Ribana na cor amarela\n*Medidas:*\nPescoço: 28 a 38 cm\nTórax: 56 cm\nComprimento: 44 cm.',
    preco: 35,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/7xXpNQk3/B-sica-Vermelho-IA.jpg',
      'https://i.ibb.co/V0RCsX8Z/B-sica-Vermelho-Costas.png',
      'https://i.ibb.co/S7HwQkdM/B-sica-Vermelho-Fte.png',
      'https://i.ibb.co/Wp7q1qXR/B-sica-Vermelho-Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Básica Xadrez P',
    tamanhos: ['P'],
    descricao: '*Novidade!* \nDeixe seu pet quentinho e confortável com essa blusa básica em fleece\nCom estampa xadrez em tons vibrantes de vermelho, azul marinho e branco, ela traz um visual clássico e estiloso para os dias mais fresquinhos. O acabamento em ribana preta na gola e nas aberturas garante melhor ajuste e um toque moderno à peça.\nConfeccionada em fleece, é super macia, leve e aconchegante, mantendo seu pet aquecido sem limitar os movimentos. O modelo é prático e fácil de vestir, ideal para o dia a dia, passeios ou momentos de descanso.\nUma peça básica, versátil e indispensável no guarda-roupa do seu pet.\n\n*Tecido:* Fleece\n*Estampa:* Xadrez em vermelho, azul marinho e branco\n*Medidas:*\nPescoço: 36 cm\nTórax: 47 cm\nComprimento: 31 cm.',
    preco: 25,
    estoque: 0,
    imagens: [
      'https://i.postimg.cc/pr4HmpPH/Basica_Xadrez_IA.png',
      'https://i.postimg.cc/qqSTNzpf/Basica_P_xadrez_Fte.png',
      'https://i.postimg.cc/brWhZsp7/Basica_P_xadrez_Costas.png',
      'https://i.postimg.cc/5yTVX6fd/Basica_P_xadrez_Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Básica Fleece Unicórnios M',
    tamanhos: ['M'],
    descricao: '*Novidade!* \nSabe aquele dia geladinho em que tudo o que a gente quer é ficar enrolado no cobertor? Com a nossa Blusa Soft Fleece, seu pet leva esse aconchego para onde for. Feita com um tecido ultra macio e térmico, ela mantém o calor corporal sem prender os movimentos.\nEstampa: Unicórnios e nuvens para deixar o passeio mais mágico.\nConforto: Acabamento em ribana que não aperta.\nDestaque: Tecido leve, fácil de lavar e que seca rapidinho!\n\n\n*Tecido:* Fleece\n*Cor:* Rosa claro com desenhos de unicórnios\n*Acabamento*: Ribana na cor rosa\n*Medidas:*\nPescoço: 30 cm\nTórax: 52 cm\nComprimento: 41 cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/ymBKSN3m/B-sica-Unicornios-IA.jpg',
      'https://i.ibb.co/608wqBwK/B-sica-Unicornios-Costas.png',
      'https://i.ibb.co/6c4RW2xx/B-sica-Unicornios-Fte.png',
      'https://i.ibb.co/cKVL3MFP/B-sica-Unicornios-Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Capa VF Verde G',
    tamanhos: ['G'],
    descricao: '*Novidade!* \nPrática, quentinha e cheia de estilo! Esta capa para pets é confeccionada em fleece e aconchegante, perfeita para manter seu pet aquecido nos dias mais frios.\nO modelo tipo capa facilita muito na hora de vestir, sendo ideal para cães que não gostam de dar as patinhas ao colocar roupas. Basta posicionar sobre as costas e ajustar. Possui fechamento prático com ajuste no pescoço, garantindo melhor encaixe e conforto.\nA estampa divertida de pinguins deixa a peça ainda mais charmosa e alegre.\n\n*Tecido:* Fleece com revestimento em Microsoft\n*Cor:* Verde claro com desenhos de pinguins\n*Medidas:*\nPescoço: 40 a 47 cm\nTórax: 65 a 76 cm\nComprimento: 45 cm.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/4nd1LDRP/Capa-VF-Pinguins-IA.jpg',
      'https://i.ibb.co/ch1DvDgB/Capa-VF-Pinguins-Costas.png',
      'https://i.ibb.co/yccqxHT5/Capa-VF-Pinguins-Fte.png',
      'https://i.ibb.co/670j7gTW/Capa-VF-Pinguins-Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Jaqueta Moletom G',
    tamanhos: ['G'],
    descricao: '*Novidade!* \nSe você busca o equilíbrio perfeito entre estilo urbano e funcionalidade, a nossa Jaqueta Moletom com Zíper é a escolha ideal. Com um tom bordô profundo e um bordado delicado, ela foi pensada para o pet que não abre mão da elegância, nem nos dias mais frios.\nCamada Dupla: Confeccionada em moletom encorpado com revestimento interno em moletinho, garantindo um toque suave que não irrita a pele.\nZíper nas Costas: O fechamento superior facilita muito a hora de vestir, ideal para pets que têm receio de passar roupas pela cabeça.\nAcabamento Superior: Gola alta para proteger o pescoço e bordado de alta definição.\n\n*Tecido:* Moletom com revestimento em moletinho\n*Cor:* Bordô\n*Fechamento*:Zíper\n*Medidas:*\nPescoço: 44 cm\nTórax: 58 cm\nComprimento: 43 cm.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/RGYx9Kvr/Jaqueta-IA.jpg',
      'https://i.ibb.co/jcXNGYw/Jaqueta-Costas.png',
      'https://i.ibb.co/LhCC225f/Jaqueta-fte.png',
      'https://i.ibb.co/nNZfS4hv/Jaqueta-Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Vestido Brasil P',
    tamanhos: ['P'],
    descricao: '🇧🇷 Vestido Pet Brasil - Estilo e Conforto para sua Torcedora!\n\nSeu pet também merece entrar no clima da torcida com muito charme! Este vestido exclusivo combina o orgulho de ser Brasil com materiais de alta qualidade, garantindo que sua pet fique linda sem perder o conforto.\n✨ Diferenciais do Produto:\nPeça Única: Design exclusivo, você não encontrará outro igual!\nConforto Térmico: Peitoral feito em malha de algodão, macia e respirável.\nEstilo Moderno: Saia em jeans com elastano e acabamento desfiado (destroyed), dando um toque fashionista.\nAjuste Perfeito: Possui regulador no pescoço, permitindo adaptar melhor ao corpinho da sua pet.\nDetalhes: Inclui bolsinhos charmosos na saia e o escudo da CBF em destaque.\n\n📏 Medidas da Peça:\nPescoço: Até 41 cm (ajustável).\nTórax: 45 cm.\nComprimento: 33 cm.',
    preco: 25,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/0VFN6LdX/8d384123-0e29-4c04-9d30-7ae52a94e584.jpg',
      'https://i.ibb.co/N2xHz3kw/Vestido-Brasil-Fte.png',
      'https://i.ibb.co/kgw4wBfR/Vestido-Brasil-Costas.png',
      'https://i.ibb.co/x8tdj729/Vestido-BR-Lat.png'

    ],
    observacao:'Dê um show de estilo no passeio! Garanta a camiseta do seu pet agora mesmo. 🐾⚽',
    isNovidade: true,
    tipo:'meiaestacao',
    genero:'unissex',
    sobMedida: false
  },
  {
    nome: 'Camiseta Brasil P',
    tamanhos: ['P'],
    descricao: '🇧🇷 Camiseta Pet Brasil com Listras - Estilo Camisa 10!\n\nSeu pet vai marcar um golaço com esse visual! Esta versão traz um detalhe esportivo com listras verticais verdes, perfeita para os pequenos torcedores que têm muita energia e estilo.\n\n✨ Diferenciais do Produto:\nDesign Esportivo: Detalhe exclusivo de listras verdes que dão um toque moderno e dinâmico à peça.\nMalha Premium: Produzida em algodão, oferecendo frescor e conforto para o pet não se sentir incomodado.\nLeveza e Praticidade: Fácil de vestir e ideal para climas tropicais, mantendo a liberdade total de movimentos.\nAcabamento de Qualidade: Gola e barras em ribana verde para maior durabilidade e ajuste.\n\n📏 Medidas:\nPescoço: 32 cm.\nTórax: 42 cm.\nComprimento: 30 cm.',
    preco: 25,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/bMtNfVZK/BR-P.jpg',
      'https://i.ibb.co/rfx7W2S2/Camiseta-BR-Fte-P.png',
      'https://i.ibb.co/1JR7cyBz/Camiseta-BR-Fte.png',
      'https://i.ibb.co/0pYHbf2B/Camiseta-BR-Lat-P.png'
    ],
    observacao:'Deixe seu pequeno torcedor pronto para a festa! Garanta a dele agora. 🐾💛💚',
    isNovidade: true,
    tipo:'meiaestacao',
    genero:'unissex',
    sobMedida: false
  },
  {
    nome: 'Camiseta Brasil M',
    tamanhos: ['M'],
    descricao: '🇧🇷 Camiseta Pet Brasil - Conforto de Craque!\n\n\Para os pets que torcem com garra e estilo! Essa camiseta é a escolha perfeita para deixar seu melhor amigo pronto para vibrar em todos os momentos, com a leveza que ele precisa para brincar à vontade.\n\n✨ Diferenciais do Produto:\nConforto Total: Confeccionada em malha de algodão, garantindo um toque suave na pele e excelente respirabilidade.\nLiberdade de Movimento: Modelagem cavada que não aperta e permite que o pet se movimente naturalmente.\nDesign Oficial: Estampa icônica com as cores da nossa seleção e acabamentos em ribana verde.\nDurabilidade: Tecido resistente e de fácil lavagem, ideal para o dia a dia.\n\n📏 Medidas:\nPescoço: 34 cm.\nTórax: 48 cm.\nComprimento: 43 cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/1kQzWhT/BR-M.jpg',
      'https://i.ibb.co/DDJL6tTk/Camiseta-BR-Ftet.png',
      'https://i.ibb.co/tp5Yg5z2/Camiseta-BR-Costas-M.png',
      'https://i.ibb.co/Zp9CKLDQ/Camiseta-BR-Lat-M.png'

    ],
    observacao:'Garanta já esse modelo exclusivo e deixe sua pet pronta para o próximo jogo! 🐾⚽',
    isNovidade: true,
    tipo:'meiaestacao',
    genero:'unissex',
    sobMedida: false
  },
  {
    nome: 'Camiseta Brasil G',
    tamanhos: ['G'],
    descricao: '🇧🇷 Rumo ao Hexa com Estilo Único! 🐾⚽\n\nA Copa está chegando e o seu pet não pode ficar fora dessa torcida! Apresentamos nossa Camiseta Brasil – Modelo Exclusivo, desenvolvida para quem quer torcer com conforto e originalidade.\n\nDiferente de tudo o que você já viu, essa peça combina o orgulho nacional com um design pensado no bem-estar do seu melhor amigo.\n\nDestaques do Modelo:\n✨ Ajuste Perfeito: O grande diferencial! Possui regulagem no pescoço com elástico e ponteira, garantindo que a camiseta fique na medida certa, sem apertar ou incomodar.\n✨ Conforto Natural: Confeccionada em algodão com ribanas também em algodão, permitindo que a pele do pet respire durante a comemoração.\n✨ Design Exclusivo: Detalhes que fazem a diferença para um visual de campeão.\n\n📏 Medidas:\nPescoço: Ajustável até 46cm\nTórax: 50cm\nComprimento: 43cm',
    preco: 35,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/7cvcG53/Camiseta-BR-IA.jpg',
      'https://i.ibb.co/7Jf1GHc7/Camiseta-BR-Costas.png',
      'https://i.ibb.co/6cS3t0rT/Camiseta-BR-Zoom.png',
      'https://i.ibb.co/93cC8MYQ/Camiseta-BR-Fte.png',
      'https://i.ibb.co/DgCdpcDx/Camiseta-BR-Lado.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'meiaestacao',
    genero:'unissex',
    sobMedida: false
  },
  {
    nome: 'Básica Azul M',
    tamanhos: ['M'],
    descricao: '*Novidade!* \nRoupa com regulagem no pescoço, garantindo ajuste perfeito e muito mais conforto para o seu pet.\nA peça ideal para aquecer com estilo e conforto!\nEsta linda roupinha é confeccionada em moletinho, oferecendo o equilíbrio perfeito entre leveza e aconchego, sem superaquecer o seu pet.\nA estampa geométrica em tons de cinza traz um visual moderno e delicado, ideal para quem busca praticidade com estilo.\nO caimento confortável e o acabamento cuidadoso garantem liberdade de movimentos para o dia a dia.\nGaranta já conforto, charme e aquele toque gostoso que seu pet merece! 🐾✨\n\n*Tecido:* Moletinho.\n*Cor:* Cinza claro com estampa geométrica em tons de cinza.\n*Medidas:*\nPescoço: até 45 cm\nTórax: 56 cm\nComprimento: 34 cm.',
    preco: 25,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/tPTHd8n3/plumina-azul.png',
      'https://i.ibb.co/S45BF9Yr/IMG-8074.png',
      'https://i.ibb.co/QF7DjmtS/IMG-8073.png',
      'https://i.ibb.co/Cp86yhtj/IMG-8072.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'meiaestacao',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Básica Rosa G',
    tamanhos: ['G'],
    descricao: 'Delicadeza e conforto para os dias frescos!\nEsta linda roupinha é confeccionada em moletinho macio, ideal para manter seu pet confortável sem pesar.\nA estampa fofa com ursinhos e elementos delicados traz um visual alegre e encantador.\nO acabamento da gola e das cavas em ribana garante melhor ajuste ao corpo, enquanto o corpo da peça é finalizado com o próprio tecido, proporcionando um caimento leve e confortável.\nUma peça prática, charmosa e perfeita para o dia a dia do seu pet! \n\n*Tecido:* Moletinho.\n*Acabamento:* Gola e braços em ribana; corpo com o próprio tecido.\n*Cor:* Fundo claro com estampa de ursinhos em tons suaves de rosa, bege e verde.\n*Medidas:*\nPescoço: 37 a 45 cm\nTórax: 56 cm\nComprimento: 40 cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/R4s9nWht/Pluminha-rosa.jpg',
      'https://i.ibb.co/23npTtXZ/IMG-8076.png',
      'https://i.ibb.co/xKHmzQFh/IMG-8077.png',
      'https://i.ibb.co/prnMYN6z/IMG-8075.png'
    ],
    observacao:'',
    isNovidade: true,
    tipo:'meiaestacao',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Vestido Soft com Jeans M',
    tamanhos: ['M'],
    descricao: 'Deixe sua pet quentinha e estilosa com esta roupinha super fofa! \nA parte superior em soft peludinho apresenta estampas divertidas de animais marinhos sorridentes, garantindo charme e alegria.\nA parte inferior em jeans dá um toque de modernidade e praticidade.\n\n*Tecidos:* Soft, Jeans, Microsoft e Pele.\n*Cor*: Branco com desenhos de animais marinhos, jeans, amarelo.\n*Medidas:*\n- Pescoço: 44cm.\n- Tórax: 54cm.\n- Comprimento: 48cm.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/jkxS2Vh4/Vestido-jeans-IA.png',
      'https://i.ibb.co/9H1Q3QjC/Vestido-Jeans-Fte-removebg-preview.png',
      'https://i.ibb.co/tp0Pm9hk/IMG-7036.png'
    ],
    observacao:'',
    isNovidade: false,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Vestido Babadinho P',
    tamanhos: ['P'],
    descricao: 'A peça ideal para aquecer e encantar! \nEste lindo vestido é confeccionado em soft quentinho, o tecido perfeito para garantir o bem-estar da sua companheira nos dias frios.\nA estampa de ursinhos e corações sobre o fundo amarelo é alegre e vibrante. O babado delicado na barra confere um charme extra e um visual super fofo.\nGaranta já o conforto e a fofura que a sua pet precisa!\n\n*Tecido:* Soft.\n*Cor:* Amarelo com desenhos de ursos cinza e corações rosa.\n*Medidas:*\n- Pescoço: 40cm.\n- Tórax: 44cm.\n- Comprimento: 30cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/b5Wg3hcy/Vestido-Babado-IA.png',
      'https://i.ibb.co/Gv0TwX2f/Vestido-Babado-Fte-removebg-preview.png',
      'https://i.ibb.co/Z6ndjTrD/IMG-7037.png'
    ],
    isNovidade: false,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Capa Dupla Face G',
    tamanhos: ['G'],
    descricao: 'A roupa perfeita para aquecer com zero estresse!\nEste lindo colete é feito em soft (material externo), e para um conforto e aquecimento extra, possui forro interno em Microsoft amarelo liso, garantindo um toque super agradável e o calor que seu pet merece. \nO charme fica por conta da estampa de ursinhos do amor em um fundo amarelo alegre.\nA maior vantagem deste modelo é a sua facilidade de uso: ele é totalmente ajustável graças ao fechamento em velcro no pescoço e barriga. Esqueça a dificuldade de vestir; basta envolver e prender!\nPraticidade, aconchego e estilo em um só colete.\n\n*Tecidos:* Soft externo e Microsoft interno.\n*Cor:* Amarelo com desenhos de ursos cinza e corações rosa.\n*Medidas:*\n- Pescoço: 48 a 55cm.\n- Tórax: 54 a 63cm.\n- Comprimento: 44cm.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/PvS1XC0G/Capa-DF-IA.png',
      'https://i.ibb.co/8nbDNnZQ/IMG-6574.png',
      'https://i.ibb.co/Z1fkn1hr/IMG-6710.png'
    ],
    isNovidade: false,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Básica P',
    tamanhos: ['P'],
    descricao: 'Prepare-se para esmagar de tanta fofura! \nEsta blusa básica é feita em fleece extra macio e possui uma estampa lúdica de bichinhos coloridos (elefantes, leões, macacos) sobre um charmoso fundo pink claro.\nCom o seu acabamento em ribana de algodão, a peça garante durabilidade e um toque vibrante. \nO conforto térmico é garantido, sendo perfeita para noites frescas ou para relaxar dentro de casa.\nDeixe sua pet super confortável e pronta para qualquer aventura com essa peça alegre!\n\n*Tecido:* Fleece com acabamento de ribanas rosa.\n*Cor:* Rosa com desenhos coloridos de animais (marrom, azul, verde, amarelo).\n*Medidas:*\n- Pescoço: 22cm.\n- Tórax: 48cm.\n- Comprimento: 35cm.',
    preco: 25,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/tTSwCByy/Basica-PP-IA.png',
      'https://i.ibb.co/qYVJ8595/IMG-6841.png',
      'https://i.ibb.co/mFBhFW5v/IMG-6448.png'
    ],
    isNovidade: false,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Básica GG',
    tamanhos: ['GG'],
    descricao: 'Cães grandes sente frio?\n Sim, eles também sentem! \nE encontrar roupas fofas para eles pode ser um desafio. \nEsta peça é a solução perfeita!\n Esta linda blusa básica é confeccionada em soft quentinho, o tecido ideal para garantir o conforto da sua pet nos dias mais frios ou na hora de dormir.\nA estampa de ursinhos nas nuvens sobre o fundo rosa bebê é pura doçura, com acabamentos em ribana de algodão preto dão um toque de estilo.\nGaranta já o aconchego e a fofura que a sua gigante precisa!\n\n*Tecido:* Soft com acabamento de ribanas preta.\n*Cor:* Rosa com desenhos de ursos amarelos e nuvens brancas.\n*Medidas:*\n- Pescoço: 52cm.\n- Tórax: 66cm.\n- Comprimento: 50cm.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/279LXZ65/Basica-GG-IA.png',
      'https://i.ibb.co/BHR80ZRj/IMG-6044.png',
      'https://i.ibb.co/PvFd9cTr/IMG-6045.png'
    ],
    isNovidade: false,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Básica Vermelha PP',
    tamanhos: ['PP'],
    descricao: 'A peça ideal para aquecer e encantar seu pet de pequeno porte!\nEsta linda blusa básica é confeccionada em fleece quentinho e macio, o tecido perfeito para garantir o bem-estar e o conforto da sua companheira nos dias mais frescos.\n A estampa é divertida, com um fundo vermelho vivo e adoráveis abelhinhas sorridentes, dando um charme inconfundível.\nPensada no conforto e segurança dos pets menores, a blusa conta com abertura no pescoço para a passagem da guia/coleira, facilitando o passeio.\n Garanta já o conforto e a fofura que o seu pequeno pet precisa!\n\n*Tecido:* Fleece com acabamento em fleece.\n*Cor:* Vermelho com desenhos de abelhas.\n*Medidas:*\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
    preco: 25,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/3ycJW3j7/Basica-PP-IA.png',
      'https://i.ibb.co/G4n31LzC/IMG-6722.png',
      'https://i.ibb.co/HLD43J8K/Abelhinha-Fte.png'
    ],
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Básica Azul PP',
    tamanhos: ['PP'],
    descricao: 'A peça ideal para aquecer e proteger!\nEsta linda blusa básica é confeccionada em soft de dupla camada (revestida/forrada), o tecido perfeito para garantir o dobro do calor e o bem-estar do seu pet nos dias mais frios.\nA estampa moderna em tons de azul, vermelho e cinza sobre o fundo claro é super estilosa, e os acabamentos em ribana de algodão vermelho na gola e nas cavas dão um toque vibrante de cor.\nO revestimento interno em microsoft amarelo bebê garante que ele fique ainda mais quentinho.\nPossui abertura discreta no pescoço para a passagem da guia/coleira, tornando os passeios rápidos e fáceis sem precisar tirar a roupinha.\nGaranta já o dobro de aconchego e estilo para o seu companheiro!\n\n*Tecido:* Soft externo, Microsoft interno com acabamento de ribanas vermelha.\n*Cor:* Azul com desenhos azul e vermelho. Interno na cor amarelo.\n*Medidas:*\n- Pescoço: 28cm.\n- Tórax: 44cm.\n- Comprimento: 27cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/8LQPcCjK/Basica-PP-IA.png',
      'https://i.ibb.co/8DRKM884/IMG-6948.png',
      'https://i.ibb.co/X0c07nq/IMG-6721.png'
    ],
    isNovidade: false,
    tipo:'inverno',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Básica G',
    tamanhos: ['G'],
    descricao: 'A peça ideal para aquecer e encantar!\nEsta linda blusa básica é confeccionada em soft quentinho, o tecido perfeito para garantir o bem-estar da sua companheira nos dias mais frios ou na hora de dormir.\nA estampa de ursinhos nas nuvens sobre o fundo rosa bebê é pura doçura, destacada pelos acabamentos em ribana de algodão pink vibrante na gola e nas mangas, trazendo um charme extra.\nGaranta já o conforto e a fofura que a sua pet precisa!\n\n*Tecido:* Soft com acabamento de ribanas rosa.\n*Cor:* Rosa com desenhos ursos amarelos e nuvens brancas.\n*Medidas:*\n- Pescoço: 34cm.\n- Tórax: 52cm.\n- Comprimento: 40cm.',
    preco: 35,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/Kxncn8Fs/Basica-M-IA.png',
      'https://i.ibb.co/JRC5kzHt/IMG-5682.png',
      'https://i.ibb.co/qYBWsDLb/IMG-5681.png'
    ],
    isNovidade: false,
    tipo:'inverno',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Blusa Raglan M',
    tamanhos: ['M'],
    descricao: 'A peça ideal para aquecer e manter o estilo do seu pet aventureiro!\n Esta linda blusa é confeccionada em soft quentinho, o tecido perfeito para garantir o bem-estar do seu companheiro nos dias mais frescos.\n A estampa é vibrante, com um fundo vermelho vivo e uma divertida equipe de caminhões e máquinas de construção, dando ao seu pet um look cheio de personalidade.\n O corte Raglan proporciona um visual estiloso e garante excelente mobilidade, e para a hora do passeio.\n Garanta já o conforto e a diversão que o seu pet precisa para qualquer missão, dentro ou fora de casa!\n\n*Tecido:* Soft com acabamento de ribanas vermelha.\n*Cor:* Vermelho com desenhos de caminhões e trator azul e amarelo.\n*Medidas:*\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
    preco: 35,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/7Nj1p6pk/Raglan-IA.png',
      'https://i.ibb.co/8DfZ0msC/Blusa-Raglan-Fte.png',
      'https://i.ibb.co/Cs8M9q5L/Blusa-Raglan-Verso.png'
    ],
    tipo:'inverno',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Cama P',
    tamanhos: ['P'],
    descricao: '🐾 O refúgio perfeito para o seu melhor amigo! ☁️\n\nProcurando por conforto, higiene e estilo em um só produto? Nossa caminha foi pensada em cada detalhe para garantir o descanso que o seu pet merece!\n✅ Conforto Premium: Enchimento em fibra siliconada antialérgica, super macia e fofinha.\n✅ Praticidade Total: Ela é 100% removível! Você consegue tirar todos os enchimentos para lavar a capa com facilidade.\n✅ Qualidade e Durabilidade: Confeccionada em tricoline de alta qualidade com estampas exclusivas e fundo em courino (mais resistente e fácil de limpar).\n📏 Medidas:\nInterna: 36x38cm (área útil de descanso)\nExterna: 54x56cm',
    preco: 110,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/DDK1dGx6/cama-P.jpg',
      'https://i.ibb.co/2pv8vS4/Cama-P-Deitada.png',
      'https://i.ibb.co/H3HP9QQ/Cama-P-Verso.png',
      'https://i.ibb.co/vvqsq1KB/Cama-P-Fte.png'
    ],
    observacao:'',
    tipo:'acessorios',
    sobMedida: true
  },
  {
    nome: 'Cama M',
    tamanhos: ['M'],
    descricao: '🐘 Conforto em dose dupla (e tamanho M!) 💖\nA nossa queridinha ganhou uma versão mais espaçosa para garantir que o seu pet se espalhe com toda a liberdade do mundo! Com uma estampa super fofa de elefantinhos e um pink vibrante, ela é o equilíbrio perfeito entre beleza e bem-estar.\n\nPor que escolher a nossa Cama M?\n✨ Espaço de sobra: Ideal para pets que gostam de dormir esticados ou para aqueles de porte médio.\n✨ Toque Macio: Produzida em tricoline de alta qualidade, garantindo frescor e suavidade.\n✨ Nuvem de Algodão: Enchimento em fibra siliconada que não deforma e é extremamente aconchegante.\n✨ Higiene Facilitada: A peça é totalmente removível, facilitando a lavagem e mantendo o cantinho sempre limpinho.\n✨ Base em Courino: Protege contra a umidade do chão e traz muito mais durabilidade.\n📏 Medidas:\nParte Interna: 55x55cm\nParte Externa: 70x70cm',
    preco: 150,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/Sw08MJfv/Cama-M.jpg',
      'https://i.ibb.co/k65CszGQ/Cama-M-Deitada.png',
      'https://i.ibb.co/whcv68C6/Cama-M-Verso.png',
      'https://i.ibb.co/B5StHHDy/Cama-M-Fte.png'
    ],
    observacao:'',
    tipo:'acessorios',
    sobMedida: true
  },
  {
    nome: 'Manta Rosa M',
    tamanhos: ['M'],
    descricao: '✨ Uma manta mágica para noites iluminadas! 🌙💖\n\nNossa Manta Fleece Tamanho M une o máximo de aconchego com um toque de diversão que vai encantar você e seu pet. \nPerfeita para aqueles dias mais frios ou para deixar o cantinho de dormir ainda mais especial.\n\nPor que ela é incrível?\n🌟 Toque de Nuvem: Feita em fleece ultra macio, que mantém o calor sem pesar.\n🌟 Tamanho Generoso: Com 1,00m x 0,90m, ela é ideal para cobrir camas médias ou para o pet se enrolar todinho.\n🌟 Estampa Encantadora: Unicórnios, luas e estrelas em um rosa vibrante e maravilhoso.\n📏 Medidas: 1,00m x 0,90m',
    preco: 35,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/ds3pT3Qc/Manta-Rosa-IA.jpg',
      'https://i.ibb.co/5XWkT8wQ/Manta-Rosa-Aberta.png',
      'https://i.ibb.co/YFs8JJ4j/Manta-Rosa-Fte.png'

    ],
    observacao:'',
    tipo:'acessorios',
    sobMedida: false
  },
  {
    nome: 'Manta Azul M',
    tamanhos: ['M'],
    descricao: '✨ Uma manta mágica para noites iluminadas! 🌙💖\n\nNossa Manta Fleece Tamanho M une o máximo de aconchego com um toque de diversão que vai encantar você e seu pet. \nPerfeita para aqueles dias mais frios ou para deixar o cantinho de dormir ainda mais especial.\n\nPor que ela é incrível?\n🌟 Toque de Nuvem: Feita em fleece ultra macio, que mantém o calor sem pesar.\n🌟 Tamanho Generoso: Com 1,00m x 0,90m, ela é ideal para cobrir camas médias ou para o pet se enrolar todinho.\n🌟 Estampa Encantadora: Dinossauros.\n📏 Medidas: 1,00m x 0,90m',
    preco: 40,
    estoque: 2,
    imagens: [
      'https://i.ibb.co/fVx5mfw6/Manta-Azul-IA.jpg',
      'https://i.ibb.co/mp2VMS1/Manta-Azul-Aberta.png',
      'https://i.ibb.co/mCQxYFR1/Manta-Azul-Fte.png'

    ],
    observacao:'',
    tipo:'acessorios',
    sobMedida: false
  },
  {
    nome: 'Capa de chuva Bagun G',
    tamanhos: ['G'],
    descricao: 'Garanta que seu pet se mantenha seco e estiloso nos dias de chuva!\nEsta capa é confeccionada em Nylon Bagun, um tecido técnico de alta resistência e maior rigidez, que confere um caimento estruturado à peça, além de ser totalmente impermeável, protegendo seu companheiro da umidade.\nO design funcional conta com capuz para proteger a cabeça e as orelhas e um fechamento prático e seguro em velcro na barriga e no pescoço, permitindo um ajuste rápido e perfeito na hora de sair.\n O charme final fica por conta do acabamento em viés de algodão (amarelo), que confere um toque moderno e sofisticado.\nProteção garantida com a durabilidade e a qualidade que o Nylon Bagun oferece!\n*Atenção:* Este modelo oferece ótima proteção contra a maioria das chuvas, mas não é projetado para enfrentar temporais fortes.\n\n*Tecido:* Nylon Bagun.\n*Cor:* Azul marinho.\n*Medidas:*\n- Pescoço: 48 a 56 cm.\n- Tórax: 60 a 66 cm.\n- Comprimento: 46 cm.',
    preco: 40,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/fY8gDWvr/Bagun-IA.png',
      'https://i.ibb.co/7Jyx4wWc/Capa-Bagun-Costas.png',
      'https://i.ibb.co/HjSKcJz/Capa-Bagun-FTE.png'
    ],
    observacao: '',
    isNovidade: false,
    tipo:'acessorios',
    genero:'menino',
    sobMedida: false
  },
  {
    nome: 'Capa de chuva lateral G',
    tamanhos: ['G'],
    descricao: 'Mantenha seu pet seco com uma capa que oferece proteção de qualidade e é super prática para os passeios!\n Esta capa é confeccionada em Nylon 70, um tecido conhecido por sua leveza, resistência a rasgos e por ser o mesmo material utilizado em guarda-chuvas, garantindo sua eficácia como impermeável. \nO design funcional conta com capuz para proteger a cabeça e as orelhas e uma passagem para coleira/guia na região do pescoço, facilitando o uso sem comprometer a proteção. \nAlém disso, ela possui fechamento em velcro tanto no pescoço quanto na barriga, assegurando um ajuste rápido, seguro e muito confortável.\n Garanta já esta capa indispensável para que a chuva nunca mais cancele o passeio!\n*Atenção:* Este modelo oferece ótima proteção contra a maioria das chuvas, mas não é projetado para enfrentar temporais fortes.\n\n*Tecido:* Nylon 70.\n*Cor:* Azul claro. \n*Medidas:*\n- Pescoço: 50 a 55 cm.\n- Tórax: 54 a 62 cm.\n- Comprimento: 36 cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/FbNZjDpT/Capa-G-IA.png',
      'https://i.ibb.co/cXsVFZJv/Capa-Nylon-Transpasse-FTE.png',
      'https://i.ibb.co/FZ2x3mt/Capa-Nylon-Transpasse-Costas.png'
    ],
    observacao: '',
    isNovidade: false,
    tipo:'acessorios',
    genero:'menino',
    sobMedida: false
  },
  {
    nome: 'Capa de chuva G',
    tamanhos: ['G'],
    descricao: 'Mantenha seu pet seco com uma capa que oferece proteção de qualidade e é super prática para os passeios!\n Esta capa é confeccionada em Nylon 70, um tecido conhecido por sua leveza, resistência a rasgos e por ser o mesmo material utilizado em guarda-chuvas, garantindo sua eficácia como impermeável. \nO design funcional conta com capuz para proteger a cabeça e as orelhas e uma passagem para coleira/guia na região do pescoço, facilitando o uso sem comprometer a proteção. \nAlém disso, ela possui fechamento em velcro tanto no pescoço quanto na barriga, assegurando um ajuste rápido, seguro e muito confortável.\n Garanta já esta capa indispensável para que a chuva nunca mais cancele o passeio!\n*Atenção:* Este modelo oferece ótima proteção contra a maioria das chuvas, mas não é projetado para enfrentar temporais fortes.\n\n*Tecido:*  Nylon 70.\n*Cor:* Azul claro.\n*Medidas:*\n- Pescoço: 43 a 47 cm.\n- Tórax: 67 a 72 cm.\n- Comprimento: 46 cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/FbNZjDpT/Capa-G-IA.png',
      'https://i.ibb.co/rKFNFnrF/Capa-Nylon-FTE.png',
      'https://i.ibb.co/Y7mFJLnm/Capa-Nylon-Costas.png'
    ],
    observacao: '',
    isNovidade: false,
    tipo:'acessorios',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Capa de chuva M',
    tamanhos: ['M'],
    descricao: 'Mantenha seu pet seco com uma capa que oferece proteção de qualidade e é super prática para os passeios!\n Esta capa é confeccionada em Nylon 70, um tecido conhecido por sua leveza, resistência a rasgos e por ser o mesmo material utilizado em guarda-chuvas, garantindo sua eficácia como impermeável. \nO design funcional conta com capuz para proteger a cabeça e as orelhas e uma passagem para coleira/guia na região do pescoço, facilitando o uso sem comprometer a proteção. \nAlém disso, ela possui fechamento em velcro tanto no pescoço quanto na barriga, assegurando um ajuste rápido, seguro e muito confortável, além do acabamento em viés de algodão vermelho.\n Garanta já esta capa indispensável para que a chuva nunca mais cancele o passeio!\n*Atenção:* Este modelo oferece ótima proteção contra a maioria das chuvas, mas não é projetado para enfrentar temporais fortes.\n\n*Tecido:*  Nylon 70.\n*Cor:* Vermelho escuro.\n*Medidas:*\n- Pescoço: 40 cm.\n- Tórax: 60 a 70 cm.\n- Comprimento: 40 cm.',
    preco: 25,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/M5sYPf4f/Capa-M-IA.png',
      'https://i.ibb.co/fzDb0X3n/Capa-Vermelha-M-Fte.png',
      'https://i.ibb.co/C3KCBwWR/Capa-Vermelha-M-Costas.png'
    ],
    observacao: '',
    isNovidade: false,
    tipo:'acessorios',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Gorro de Natal',
    tamanhos: [
      'P com desenho',
      'M liso'
    ],
    descricao: '🎅 Deixe o Natal do seu Pet ainda mais Mágico!\nO (a) seu (sua) melhor amigo (a) merece entrar no clima natalino com muito estilo e conforto! Apresentamos o nosso charmoso Gorro de Natal Pet, perfeito para fotos inesquecíveis e momentos de festa.\n<strong>Características e Estilo:</strong>\n- <i>Tecido de Qualidade:</i> Confeccionado em tricoline de toque suave.\n- <i>Ajuste Perfeito:</i> Pensado para o conforto, possui elástico para garantir que não caia durante a diversão.\n- <i>Segurança e Praticidade:</i> Conta com um moderno fechamento com ponteira "focinho de porco", que permite um ajuste fácil e seguro.\n- <i>Estilo Único:</i> O vermelho vibrante, o pompom fofo e a barra felpuda branca combinam com a alegria da época.\n✨ Encomende Sob Medida! Se o seu pet é de um tamanho especial, não se preocupe! Fazemos o gorro em outros tamanhos por encomenda. Garanta que ele fique perfeito para o seu companheiro!\nMande uma mensagem e peça o seu!\n*Medidas:*\n- P: 10x15cm (LxA)\n- M: 12x18cm (LxA)\n- G: 22x31cm (LxA).',
    preco: 10,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/GfkH7V2T/Miyu-Gorro.png',
      'https://i.ibb.co/LXk4stDX/Gorro-G-deitado.png',
      'https://i.ibb.co/QjMGD1G6/Gorro-P-Desenho-Leg.png',
      'https://i.ibb.co/DHF1Bp9M/Gorro-M-Desenho.png',
      'https://i.ibb.co/fd8Wm08C/Gorro-G-M.png'
    ],
    observacao: 'Garanta o seu, pois a produção é limitada!',
    isNovidade: false,
    tipo:'acessorios',
    genero: 'unissex',
    sobMedida: false
  },
  {
    nome: 'Bandana Elástico P',
    tamanhos: ['P'],
    descricao: 'Quer renovar o visual do seu pet com praticidade e muito estilo? \n Conheça a nossa Bandana Pet com Elástico, a peça perfeita para o seu amiguinho!\n<strong>Características e Estilo:</strong>\n- <i>Design Divertido e Dupla Face:</i> Com uma estampa principal de cachorrinhos fofos, casinhas e patinhas (ver imagem 1), e um verso liso em poá bege discreto (ver imagem 2), você tem duas opções de estilo em uma só peça!\n- <i>Ajuste Perfeito com Elástico:</i> Diga adeus aos nós! O acabamento em elástico (ver imagem 2) garante um vestir fácil, seguro e super confortável, adaptando-se suavemente ao pescoço do seu pet sem apertar.\n- <i>Qualidade e Durabilidade:</i> Feita com tecidos macios e resistentes, nossa bandana é ideal para o uso diário e aguenta as aventuras do seu amigão.\nEstilo e praticidade juntos? Só com a nossa Bandana Pet Duo! Garanta já a do seu pet!\n*Medidas:*\n- Pescoço: 41 a 50 cm.\n- Comprimento: 15 cm.',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/6R7HtRPJ/Bandana-Elastico-IA.png',
      'https://i.ibb.co/HLcsB12f/Bandana-El-stico-Verde-Fte.png',
      'https://i.ibb.co/wFdv2XgZ/Bandana-El-stico-Verde-Costas.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'acessorios',
    genero: 'unissex',
    sobMedida: true
  },
  {
    nome: 'Bandana Botão P',
    tamanhos: ['P'],
    descricao: 'Adicione um toque de estilo e personalidade com esta bandana dupla face! Uma peça versátil que oferece duas opções de look em uma só.\n<strong>Características e Estilo:</strong>\n- <i>Dupla Face e Versátil:</i> Oferece duas estampas, permitindo mudar o visual em segundos.\n<i>- Lado 1 (Estampado):</i> Apresenta uma estampa divertida e moderna com tema tropical, incluindo flamingos, flores coloridas e detalhes como óculos de sol, tudo sobre um fundo claro/rosa pálido. É o lado perfeito para um visual alegre e descontraído.\n- <i>Lado 2 (Cor Sólida):</i> Confeccionado em tricoline pink vibrante, este lado é ideal para um look mais marcante e estiloso.\n- <i>Material de Qualidade:</i> Feita em tricoline 100% algodão, o tecido é macio e confortável, ideal para uso prolongado.\n- <i>Fecho Prático e Seguro:</i> Possui um fecho de botões de pressão (dois botões pink), que garante um ajuste fácil, rápido e seguro, sem risco de desamarrar.\n*Medidas:*\n- Pescoço: 23 a 30 cm.\n- Comprimento: 15 cm.',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/WNvxFkVw/Bandana-Fla-Pink-IA.png',
      'https://i.ibb.co/jvCg57Qp/BPink-Fte-removebg-preview.png',
      'https://i.ibb.co/Kz5ZM3jL/BPink-Vers-removebg-preview.png',
      'https://i.ibb.co/JRsqyrdc/BPink-Tras-removebg-preview.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'acessorios',
    genero:'unissex',
    sobMedida: true
  },
  {
    nome: 'Bandana Safari M',
    tamanhos: ['M'],
    descricao: 'Adicione um toque de estilo e personalidade com esta bandana dupla face! Uma peça versátil que oferece duas opções de look em uma só.\n<strong>Características e Estilo:</strong>\n- <i>Dupla Face e Versátil:</i> Oferece duas estampas, permitindo mudar o visual em segundos.\n<i>- Lado 1 (Estampado - Safari Moderno):</i> Apresenta uma estampa animada com um tema de selva/safari, incluindo leões, tucanos, macacos e folhagens tropicais, tudo sobre um fundo listrado em preto e cru. É um visual alegre e cheio de personalidade!\n- <i>Lado 2 (Cor Sólida - Verde Esmeralda):</i> Confeccionado em tricoline verde esmeralda vibrante, este lado oferece uma opção mais clássica e intensa, realçando a cor dos olhos ou da pelagem.\n- <i>Material de Qualidade:</i> Feita em tricoline 100% algodão, o tecido é macio e confortável, ideal para uso prolongado.\n- <i>Fecho Prático e Seguro:</i> Possui um fecho de botão de pressão na cor verde, que garante um ajuste fácil, rápido e seguro, sem risco de desamarrar ou incomodar.\n*Medidas:*\n- Pescoço: 38 cm.\n- Comprimento: 20 cm.',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/fVDV8S14/Bandana-Safari-IA.png',
      'https://i.ibb.co/DgSwqwjg/BVer-fte-removebg-preview.png',
      'https://i.ibb.co/svWrz5Jq/BVer-costas-removebg-preview.png',
      'https://i.ibb.co/hJPQD58F/BVer-tras-removebg-preview.png'
    ],
     observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'acessorios',
    genero:'menino',
    sobMedida: false
  },
  {
    nome: 'Bandana Flamingos M',
    tamanhos: ['M'],
    descricao: 'Adicione um toque de estilo e personalidade com esta bandana dupla face! Uma peça versátil que oferece duas opções de look em uma só.\n<strong>Características e Estilo:</strong>\n- <i>Dupla Face e Versátil:</i> Oferece duas estampas, permitindo mudar o visual em segundos.\n<i>- Lado 1 (Estampado):</i> Apresenta uma estampa divertida e moderna com tema tropical, incluindo flamingos, flores coloridas e detalhes como óculos de sol, tudo sobre um fundo claro/rosa pálido. É o lado perfeito para um visual alegre e descontraído.\n- <i>Lado 2 (Cor Sólida):</i> Confeccionado em tricoline laranjado, este lado é ideal para um look mais marcante e estiloso.\n- <i>Material de Qualidade:</i> Feita em tricoline 100% algodão, o tecido é macio e confortável, ideal para uso prolongado.\n- <i>Fecho Prático e Seguro:</i> Possui um fecho de botões de pressão (dois botões laranjados), que garante um ajuste fácil, rápido e seguro, sem risco de desamarrar.\n*Medidas:*\n- Pescoço: 24 a 30 cm.\n- Comprimento: 17 cm.',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/R49Zch1Z/Banda-Flamingo-IA.png',
      'https://i.ibb.co/SXqzWSp7/Blar-Fte-removebg-preview.png',
      'https://i.ibb.co/wFvTjLVq/blar-removebg-preview.png',
      'https://i.ibb.co/d4zRMd8H/blar-tras-removebg-preview.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'acessorios',
    genero:'menina',
    sobMedida: false
  },
  {
    nome: 'Vestido Tigre Jeans GG',
    tamanhos: ['GG'],
    descricao: 'Sua pet vai desfilar charme por onde passar com este vestido adorável e super estiloso!\n Confeccionado para unir conforto e muito estilo, este modelo é perfeito para cães que amam se destacar.\n <strong>Características do Look:</strong>\n- <i>Estampa Divertida e Fofa:</i> A parte de cima é feita em tecido leve de algodão com uma estampa alegre de oncinhas, arco-íris e flores. Um visual delicado e cheio de vida.\n- <i>Saia Jeans Elegante:</i> A saia em jeans escuro com pregas confere um caimento lindo e sofisticado, ideal para passeios e ocasiões especiais. O jeans também garante maior durabilidade.\n- <i>Toque de Cor:</i> O detalhe da faixa vermelha na cintura cria um contraste vibrante, adicionando um toque de cor que realça toda a peça.\n- <i>Conforto em Primeiro Lugar:</i> O modelo estilo frente única ou de alças garante que a roupinha seja fácil de vestir e confortável para que sua pet se movimente livremente. É perfeita para o dia a dia e para encontros no parque.\n Este vestido é ideal para quem busca uma peça que é puro charme, feita com qualidade e pensada no bem-estar do seu bichinho.\n Vista sua pet com alegria e estilo!\n*Medidas:*\n- Pescoço: 48 a 56 cm.\n- Tórax: 54 a 60 cm.\n- Comprimento: 49 cm.',
    preco: 45,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/fdSVF6nd/Vestido-Jeans-IA.png',
      'https://i.ibb.co/CpQp70wv/IMG-7589.png',
      'https://i.ibb.co/4ZtLtvZd/IMG-7590.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina',
    sobMedida: true
  },
  {
    nome: 'Vestido Safári Rosa GG',
    tamanhos: ['GG'],
    descricao: 'Prepare-se para uma expedição fashion! \nEste vestido encantador transforma sua pet em uma verdadeira aventureira, sem abrir mão da delicadeza. É a combinação perfeita de diversão e leveza para os passeios.\n<strong>Detalhes Exclusivos que Amamos:</strong>\n- <i>Estampa de Safari Lúdica:</i> A parte de cima é feita em tecido de algodão com uma estampa vibrante e divertida de bichinhos do safari: leões, zebras, girafas, macaquinhos e jacarés sobre um fundo rosa claro. Uma graça que chama a atenção!\n- <i>Saia de Princesa:</i> A saia é composta por camadas de tecido leve, com um toque de organza rosa bebê. O volume e a leveza dão um efeito "princesa" e garantem muito movimento e charme ao caminhar.\n- <i>Design Confortável:</i> O modelo estilo frente única ou de alças é prático, fácil de colocar e permite que sua pet brinque e se divirta com total conforto e liberdade.\n- <i>Perfeito para Fotos:</i> É o look ideal para comemorar aniversários, tirar fotos temáticas ou simplesmente fazer um passeio cheio de estilo.\nEste vestido é a escolha certa para a pet que é corajosa como um leãozinho e meiga como uma princesa!\nLeve a alegria do safari para o guarda-roupa da sua melhor amiga!\n*Medidas:*\n- Pescoço: 44 a 52 cm.\n- Tórax: 60 a 70 cm.\n- Comprimento: 53 cm.',
    preco: 45,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/DfbJLQSh/RP-Festa-Zoo-Miyu.png',
      'https://i.ibb.co/JFgDQBwG/IMG-7593.png',
      'https://i.ibb.co/W4mmyJr0/IMG-7594.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina',
    sobMedida: false
  },
  {
    nome: 'Vestido Marinheiro GG',
    tamanhos: ['GG'],
    descricao: 'Sua pet pronta para navegar em grande estilo!\n Esta fantasia de marinheira é um clássico que une o charme tradicional dos uniformes náuticos com o conforto que sua melhor amiga merece.\nPerfeita para festas a fantasia, ensaios fotográficos ou para aqueles passeios onde a elegância é obrigatória!\n<strong>Detalhes que fazem a diferença:</strong>\n- <i>Estilo Marinheiro Autêntico:</i> O destaque fica por conta da gola grande em azul-marinho com acabamento em viés branco, imitando o tradicional colarinho "Seifuku" (estilo marinheiro japonês/escolar).\n- <i>Laço Vermelho Vibrante:</i> Um lindo laço em cetim vermelho decora a frente, adicionando um toque de cor e feminilidade, e contrastando perfeitamente com o azul e o branco.\n- <i>Combinação de Cores Clássica:</i> As cores azul-marinho, branco e vermelho criam um visual atemporal e muito elegante.\n- <i>Saia Rodada:</i> A saia em azul-marinho, com pregas, dá volume e movimento, garantindo que sua pet fique linda e tenha total liberdade para se movimentar.\n- <i>Conforto na Fantasia:</i> Feito com tecidos leves e pensado para ser prático, este modelo garante que a diversão não seja interrompida pelo desconforto.\nVista sua pet com este look clássico e garanta que ela seja o centro das atenções em qualquer evento!\n*Medidas:*\n- Pescoço: 48 a 54 cm.\n- Tórax: 60 a 64 cm.\n- Comprimento: 47 cm.',
    preco: 45,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/WvZSrKyq/Miyu-Marinheira.png',
      'https://i.ibb.co/SXpz0q86/IMG-7591.png',
      'https://i.ibb.co/rGpmnWFH/IMG-7592.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina',
    sobMedida: false
  },
  {
    nome: 'Vestido Pink GG',
    tamanhos: ['GG'],
    descricao: 'Sua pet vai brilhar como uma verdadeira estrela com este vestido pink luxuoso!\nPerfeito para ocasiões especiais, festas, casamentos pet ou para aquele passeio onde sua melhor amiga merece estar deslumbrante e ser o centro das atenções.\n<strong>Detalhes que Encantam e Impressionam:</strong>\n- <i>Cor Pink Vibrante:</i> Um tom de pink intenso e apaixonante que realça a beleza de qualquer pet e transmite alegria e sofisticação.\n- <i>Renda Exclusiva:</i> A parte superior e os detalhes na saia são cuidadosamente trabalhados em renda no mesmo tom de pink, adicionando uma textura rica e um toque de delicadeza e luxo inigualáveis.\n- <i>Saia em Camadas Charmosa:</i> A saia é composta por camadas (babados) que dão volume, movimento e um caimento perfeito, criando um visual de festa que é pura elegância.\n- <i>Design Confortável:</i> Apesar de todo o glamour, o design do vestido (estilo frente única) foi pensado para ser confortável e fácil de vestir, garantindo que sua pet desfile com leveza e sem restrições.\nEste não é apenas um vestido, é uma declaração de estilo e carinho para sua companheira de quatro patas.\nSua pet merece este toque de glamour! Garanta já o Vestido Pink Luxo com Renda para ela.\n*Medidas:*\n- Pescoço: 40 a 52 cm.\n- Tórax: 46 a 60 cm.\n- Comprimento: 45 cm.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/R8fTZP3/Miyu-Renda.png',
      'https://i.ibb.co/B2614dzx/IMG-7585.png',
      'https://i.ibb.co/h1K2bvC8/IMG-7586.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina',
    sobMedida: false
  },
  {
    nome: 'Vestido Floral Lilás GG',
    tamanhos: ['GG'],
    descricao: 'Um toque de romance e frescor para a sua companheira!\nEste vestido combina a delicadeza das flores com a suavidade do lilás, criando um visual campestre encantador e muito elegante.\nIdeal para piqueniques, passeios ao ar livre e para quem ama um estilo shabby chic para sua pet!\n<strong>Destaques Florais e Delicados:</strong>\n- <i>Estampa Romântica:</i> O corpo do vestido é feito com um tecido de algodão de fundo branco e uma estampa miúda e delicada de florzinhas em tons de lilás e verde. Puro charme!\n- <i>Combinação de Tecidos:</i> A peça é harmonizada com tecidos lisos em lilás/roxo suave na parte superior (decote e alças) e nos babados intermediários da saia, criando um lindo contraste de texturas.\n- <i>Babados e Camadas:</i> A saia em camadas e babados (estilo "Maria Chiquinha") confere um movimento alegre e um caimento gracioso, perfeito para a pet que adora se movimentar.\n- <i>Laço de Açúcar:</i> Um grande laço branco em cetim na cintura adiciona o toque final de doçura, arrematando o look com elegância.\n- <i>Conforto Garantido:</i> O modelo frente única ou de alças é prático e foi pensado para garantir o bem-estar e a liberdade da sua pet durante todo o passeio.\nVista sua pet com a beleza dos campos floridos! Este vestido é puro carinho e estilo.\nAdicione este charme floral ao guarda-roupa da sua amiguinha!\n*Medidas:*\n- Pescoço: 52 cm.\n- Tórax: 66 cm.\n- Comprimento: 45 cm.',
    preco: 50,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/hJ5NDXmT/RP-Glamour-Lilas-Miyu.png',
      'https://i.ibb.co/CSCdmsz/IMG-7587.png',
      'https://i.ibb.co/1tm3KGP9/IMG-7588.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina',
    sobMedida: false
  },
  {
    nome: 'Vestido Floral GG',
    tamanhos: ['GG'],
    descricao: 'Sua pet vai desfilar com um visual cheio de energia e cor!\n Este vestido combina a doçura do floral pink com a intensidade do vermelho, criando um look vibrante e inesquecível.\nIdeal para pets que amam chamar a atenção e esbanjar alegria em todos os passeios!\n<strong>Combinação de Cores Marcante:</Strong>\n- <i>Estampa do Corpo:</i> O corpo e o babado superior são feitos em tecido de algodão com uma charmosa estampa de florzinhas em diversos tons de pink e vinho sobre um fundo rosa mais claro. Uma composição visual rica e feminina.\n- <i>Toque de Paixão:</i> O contraste fica por conta do babado inferior em tecido vermelho vivo, que adiciona profundidade, volume e uma dose extra de ousadia ao look.\n- <i>Modelo com Movimento:</i> A saia é confeccionada com babados em camadas, garantindo um caimento rodado e muito movimento a cada passo da sua pet.\n- <i>Conforto Descomplicado:</i> O design de alças/frente única garante que a peça seja prática de vestir e super confortável, permitindo que sua pet brinque e se divirta com liberdade.\nSe a sua pet é pura alegria e adora um look de impacto, este vestido é a escolha perfeita!\nLeve já o poder do pink e vermelho para o guarda-roupa da sua amiguinha!\n*Medidas:*\n- Pescoço: 46 a 62 cm.\n- Tórax: 64 a 72 cm.\n- Comprimento: 51 cm.',
    preco: 50,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/gFrr4Bx8/RP-Rosinha-Miyu.png',
      'https://i.ibb.co/ccvhC3Pq/IMG-7595.png',
      'https://i.ibb.co/cStsXHJn/IMG-7596.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina'
  },
  {
    nome: 'Vestido Rena Encantada GG',
    tamanhos: ['GG'],
    descricao: 'Sua pet pronta para brilhar na Noite Feliz! \nEste vestido é o look perfeito para celebrar o Natal com muito estilo, alegria e o espírito festivo.\nIdeal para fotos de família, ceia natalina e para quem quer deixar a pet com um visual temático inesquecível!\n<strong>Detalhes Festivos e Charmosos:</strong>\n - <i>Estampa Natalina Exclusiva:</i> O corpo do vestido é feito em tecido verde-escuro (tom pinho) e conta com uma estampa adorável de renas fofas, guirlandas, presentes e bengalas doces. Um verdadeiro charme natalino!\n- <i>Babados em Tom Neutro:</i> A saia em camadas (babados) utiliza um tom bege/creme suave, que proporciona um contraste elegante com o verde da estampa, remetendo ao aconchego das festas.\n- <i>Laços de Presente:</i> A cintura é decorada com laços de fita de cetim - um laço vermelho vibrante e um laço amarelo - que imitam os embrulhos de Natal, dando um toque final divertido e festivo.\n- <i>Conforto na Celebração:</i> O modelo de alças/frente única é prático de vestir e foi desenhado para garantir o máximo de conforto e liberdade para sua pet aproveitar as festividades.\nPrepare a câmera! Com este vestido, sua pet será a estrela mais fofa da sua decoração de Natal.\nGaranta este look natalino exclusivo para sua amiguinha!\n*Medidas:*\n- Pescoço: 52 a 60 cm.\n- Tórax: 58 a 70 cm.\n- Comprimento: 48 cm.',
    preco: 55,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/PsNp1YLn/RP-Natal-Renas-Miyu.png',
      'https://i.ibb.co/rfwd8hY3/IMG-7581.png',
      'https://i.ibb.co/LDJByrZH/IMG-7582.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina',
    sobMedida: false
  },
  {
    nome: 'Vestido Flocos de Neve GG',
    tamanhos: ['GG'],
    descricao: 'Celebre a magia do Natal com muito brilho e sofisticação!\n Este vestido é a escolha perfeita para sua pet entrar no espírito natalino com um toque de elegância invernal.\nIdeal para fotos temáticas, confraternizações de fim de ano ou para quem busca um visual festivo e charmoso para sua amiguinha!\n<strong>Detalhes que Encantam:</strong>\n- <i>Estampa Festiva e Delicada:</i> O corpo e a parte superior da saia são confeccionados em tecido verde-esmeralda com uma delicada estampa de flocos de neve dourados, que evoca a beleza de um Natal branco e brilhante.\n- <i>Saia de Tule Brilhante:</i> A saia inferior é feita de tule verde-água com glitter ou brilho, adicionando um toque de magia, leveza e um suave cintilar que fará sua pet deslumbrar.\n- <i>Caimento em Camadas:</i> A saia em babados e camadas proporciona um movimento gracioso e um volume que remete aos vestidos de festa, garantindo um visual encantador.\n- <i>Conforto na Celebração:</i> O design de frente única é prático, fácil de vestir e projetado para oferecer o máximo de conforto, permitindo que sua pet celebre sem restrições.\nSua pet estará pronta para ser a estrela mais brilhante da sua celebração de Natal!\nGaranta este vestido mágico e elegante para as festas de fim de ano da sua companheira!\n*Medidas:*\n- Pescoço: 44 a 54 cm.\n- Tórax: 64 a 72 cm.\n- Comprimento: 54 cm.',
    preco: 45,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/JRkQ10T0/RP-Festa-Verde-Miyu.png',
      'https://i.ibb.co/7N1XrHGL/IMG-7583.png',
      'https://i.ibb.co/7JTs9QsH/IMG-7584.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina',
    sobMedida: true

  },
  {
    nome: 'Colete Natal P',
    tamanhos: ['P'],
    descricao: 'O Natal fica ainda mais mágico com a família completa, incluindo seu melhor amigo de quatro patas!\nApresentamos o nosso encantador Colete Natalino Premium para pets.\n<strong>Detalhes que encantam:</strong>\n- <i>Estilo Festivo:</i> O colete traz uma estampa exclusiva e divertida, com motivos natalinos fofos (dachsunds, árvores e luzes), sobre um fundo claro.\n- <i>Toque de Elegância:</i> O corte social e a gravata borboleta laranja vibrante  dão um charme irresistível, perfeito para as fotos de família e encontros de fim de ano.\n- <i>Conforto e Qualidade:</i> Confeccionado com tecidos leves e confortáveis, o colete garante que seu pet participe da festa com estilo, mas sem abrir mão do bem-estar. O tecido principal superior se harmoniza com a parte inferior em um vermelho natalino clássico e vibrante.\nAdquira agora e prepare-se para os elogios! O presente de Natal mais estiloso para o seu companheiro.\n*Medidas:*\n- Pescoço: 40 a 46 cm.\n- Tórax: 44 a 54 cm.\n- Comprimento: 39cm.',
    preco: 50,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/PsYbPTLZ/Colete-IA.png',
      'https://i.ibb.co/JjtmtvJ6/Colete-Natal-Fte.png',
      'https://i.ibb.co/q3LmzS2r/COlete-Natal.png'
    ],
    tipo:'verao',
    genero:'menino',
    sobMedida: true
  },
  {
    nome: 'Básica Moletinho P',
    tamanhos: ['P'],
    descricao: 'A peça ideal para o conforto e estilo do seu pet nos dias mais amenos!\nEsta linda blusa básica é confeccionada em Moletom Pluminha, um tecido de toque extra macio e aveludado, que proporciona um calor suave e o máximo de bem-estar para o seu companheiro.\nA estampa é um show de fofura, com vários guaxinins estilosos e pequenas florzinhas sobre um fundo claro e delicado.\nO acabamento é discreto e elegante, feito no próprio tecido, garantindo um caimento perfeito e muito conforto sem costuras que incomodem.\nGaranta já este abraço quentinho e cheio de personalidade para o seu pet!\n\n*Tecido:* Moletinho.\n*Cor:* Branco com desenhos de guaximin cinza e flores rosas.\n*Medidas:*\n- Pescoço: 38cm.\n- Tórax: 48cm.\n- Comprimento: 33cm.',
    preco: 30,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/5WHJL5cG/Moletinho-IA.png',
      'https://i.ibb.co/SwkK7ygQ/IMG-7038.png',
      'https://i.ibb.co/bgnCMfTc/IMG-6635.png'
    ],
    observacao:'Atenção: Este modelo está ESGOTADO, mas não se preocupe, fazemos Sob Encomenda! Você pode solicitar o seu modelo em outras estampas e tecidos.\n<i>Entre em Contato</i> para ver as opções de estampas disponíveis e fazer seu pedido personalizado, chame-nos agora mesmo no<i> WhatsApp</i>!',
    tipo:'inverno',
    genero:'unissex',
    sobMedida: true
  },
  {
    nome: 'Pano de prato Cupcakes com renda',
    tamanhos: ['45x60'],
    descricao: 'Procurando um presente útil e lindo?\n\nPanos de prato artesanais são clássicos que nunca saem de moda. Esse modelo de cupcake com poá rosa e acabamentos com renda e sianinha é o mimo ideal para chá de cozinha, casa nova ou para você mesma se presentear!\nConfeccionados com o autêntico tecido pé de galinha, conhecido por sua excelente qualidade, alta absorção e durabilidade, esses panos são ideais para secar louças, enxugar as mãos e auxiliar em todas as tarefas do dia a dia. Esqueça aqueles panos que não secam de verdade e soltam fiapos!\n<strong>Características do Produto:</strong>\n- <i>Pano Legítimo Pé de Galinha:</i> 100% algodão, alvejado (super branco) e com a trama tradicional que garante a melhor absorção.\n- <i>Detalhes que Encantam:</i> Cada pano é cuidadosamente finalizado com barrados em tecido de tricoline 100% algodão, trazendo estampas vivas e cheias de personalidade.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/nMr8Q9Mx/Cupcake-renda.png'
    ],
    tipo:'artesanato',
    sobMedida: false
  },
  {
    nome: 'Pano de prato Corações com renda',
    tamanhos: ['45x60'],
    descricao: 'Procurando um presente útil e lindo?\n\nPanos de prato artesanais são clássicos que nunca saem de moda. Esse modelo de corações com renda e sianinha é o mimo ideal para chá de cozinha, casa nova ou para você mesma se presentear!\nConfeccionados com o autêntico tecido pé de galinha, conhecido por sua excelente qualidade, alta absorção e durabilidade, esses panos são ideais para secar louças, enxugar as mãos e auxiliar em todas as tarefas do dia a dia. Esqueça aqueles panos que não secam de verdade e soltam fiapos!\n<strong>Características do Produto:</strong>\n- <i>Pano Legítimo Pé de Galinha:</i> 100% algodão, alvejado (super branco) e com a trama tradicional que garante a melhor absorção.\n- <i>Detalhes que Encantam:</i> Cada pano é cuidadosamente finalizado com barrados em tecido de tricoline 100% algodão, trazendo estampas vivas e cheias de personalidade.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/M596ZpCp/Cora-es.png'
    ],
    tipo:'artesanato',
    sobMedida: false
  },
  {
    nome: 'Pano de prato Bules com renda',
    tamanhos: ['45x60'],
    descricao: 'Procurando um presente útil e lindo?\n\nPanos de prato artesanais são clássicos que nunca saem de moda. Esse modelo de bules com poá azul e acabamento com renda e passa-fita é o mimo ideal para chá de cozinha, casa nova ou para você mesma se presentear!\nConfeccionados com o autêntico tecido pé de galinha, conhecido por sua excelente qualidade, alta absorção e durabilidade, esses panos são ideais para secar louças, enxugar as mãos e auxiliar em todas as tarefas do dia a dia. Esqueça aqueles panos que não secam de verdade e soltam fiapos!\n<strong>Características do Produto:</strong>\n- <i>Pano Legítimo Pé de Galinha:</i> 100% algodão, alvejado (super branco) e com a trama tradicional que garante a melhor absorção.\n- <i>Detalhes que Encantam:</i> Cada pano é cuidadosamente finalizado com barrados em tecido de tricoline 100% algodão, trazendo estampas vivas e cheias de personalidade.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/FkjgxQyV/Bule-renda.png'
    ],
    tipo:'artesanato',
    sobMedida: false
  },
  {
    nome: 'Pano de prato Doces com renda',
    tamanhos: ['45x60'],
    descricao: 'Procurando um presente útil e lindo?\n\nPanos de prato artesanais são clássicos que nunca saem de moda. Esse modelo de doces com poá bege e acabamento com renda e passa-fita é o mimo ideal para chá de cozinha, casa nova ou para você mesma se presentear!\nConfeccionados com o autêntico tecido pé de galinha, conhecido por sua excelente qualidade, alta absorção e durabilidade, esses panos são ideais para secar louças, enxugar as mãos e auxiliar em todas as tarefas do dia a dia. Esqueça aqueles panos que não secam de verdade e soltam fiapos!\n<strong>Características do Produto:</strong>\n- <i>Pano Legítimo Pé de Galinha:</i> 100% algodão, alvejado (super branco) e com a trama tradicional que garante a melhor absorção.\n- <i>Detalhes que Encantam:</i> Cada pano é cuidadosamente finalizado com barrados em tecido de tricoline 100% algodão, trazendo estampas vivas e cheias de personalidade.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/8nxbYJYt/Doces-renda.png'
    ],
    tipo:'artesanato',
    sobMedida: false
  },
  {
     nome: 'Pano de prato Bules',
    tamanhos: ['45x60'],
    descricao: 'Hora do café com elegância!\nTem coisa mais gostosa que uma cozinha com carinha de casa de vó, mas com o capricho do artesanato moderno? Esse pano de prato traz uma estampa delicada de bules e flores que é puro charme.\nBarrado com estampa floral vintage\nAcabamento delicado em passa-fita\nConfeccionados com o autêntico tecido pé de galinha, conhecido por sua excelente qualidade, alta absorção e durabilidade, esses panos são ideais para secar louças, enxugar as mãos e auxiliar em todas as tarefas do dia a dia. Esqueça aqueles panos que não secam de verdade e soltam fiapos!\n<strong>Características do Produto:</strong>\n- <i>Pano Legítimo Pé de Galinha:</i> 100% algodão, alvejado (super branco) e com a trama tradicional que garante a melhor absorção.\n- <i>Detalhes que Encantam:</i> Cada pano é cuidadosamente finalizado com barrados em tecido de tricoline 100% algodão, trazendo estampas vivas e cheias de personalidade',
    preco: 20,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/DH7nWfYR/Bule.png'
    ],
    tipo:'artesanato',
    sobMedida: false
  },
  {
     nome: 'Pano de prato Doces',
    tamanhos: ['45x60'],
    descricao: 'Uma explosão de cores e doçura!\nPara quem gosta de uma cozinha cheia de vida e personalidade! Esse barrado de pirulitos e balas é perfeito para deixar o dia a dia mais alegre.\nEstampa lúdica e colorida\nBarrado com acabamento em passa-fita verde\nConfeccionados com o autêntico tecido pé de galinha, conhecido por sua excelente qualidade, alta absorção e durabilidade, esses panos são ideais para secar louças, enxugar as mãos e auxiliar em todas as tarefas do dia a dia. Esqueça aqueles panos que não secam de verdade e soltam fiapos!\n<strong>Características do Produto:</strong>\n- <i>Pano Legítimo Pé de Galinha:</i> 100% algodão, alvejado (super branco) e com a trama tradicional que garante a melhor absorção.\n- <i>Detalhes que Encantam:</i> Cada pano é cuidadosamente finalizado com barrados em tecido de tricoline 100% algodão, trazendo estampas vivas e cheias de personalidade',
    preco: 20,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/C385Fj6R/Doces.png'
    ],
    tipo:'artesanato',
    sobMedida: false
  },
  {
     nome: 'Pano de prato Corujas',
    tamanhos: ['45x60'],
    descricao: 'Charme e delicadeza para sua cozinha\nDeixe sua cozinha mais alegre e acolhedora com esse lindo pano de prato artesanal!\nCom uma estampa encantadora de corujinhas coloridas, ele traz um toque de personalidade e carinho para o seu dia a dia.\n\nConfeccionados com o autêntico tecido pé de galinha, conhecido por sua excelente qualidade, alta absorção e durabilidade, esses panos são ideais para secar louças, enxugar as mãos e auxiliar em todas as tarefas do dia a dia. Esqueça aqueles panos que não secam de verdade e soltam fiapos!\n<strong>Características do Produto:</strong>\n- <i>Pano Legítimo Pé de Galinha:</i> 100% algodão, alvejado (super branco) e com a trama tradicional que garante a melhor absorção.\n- <i>Detalhes que Encantam:</i> Cada pano é cuidadosamente finalizado com barrados em tecido de tricoline 100% algodão, trazendo estampas vivas e cheias de personalidade',
    preco: 20,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/gZpWc0dj/Corujas.png'
    ],
    tipo:'artesanato',
    sobMedida: false
  },
  {
     nome: 'Pano de prato Peixes',
    tamanhos: ['45x60'],
    descricao: 'Mergulhe na fofura com esse barrado náutico!\nQue tal um cardume de cores para alegrar a sua pia? Esse pano de prato com estampa de peixinhos e estrelas-do-mar é a escolha ideal para quem ama detalhes temáticos e divertidos.\nEstampa vibrante em fundo azul marinho\nAcabamento com passa-fita amarelo\nConfeccionados com o autêntico tecido pé de galinha, conhecido por sua excelente qualidade, alta absorção e durabilidade, esses panos são ideais para secar louças, enxugar as mãos e auxiliar em todas as tarefas do dia a dia. Esqueça aqueles panos que não secam de verdade e soltam fiapos!\n<strong>Características do Produto:</strong>\n- <i>Pano Legítimo Pé de Galinha:</i> 100% algodão, alvejado (super branco) e com a trama tradicional que garante a melhor absorção.\n- <i>Detalhes que Encantam:</i> Cada pano é cuidadosamente finalizado com barrados em tecido de tricoline 100% algodão, trazendo estampas vivas e cheias de personalidade.\n\nLeve o frescor do mar para sua casa!',
    preco: 20,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/9kg4YMks/Peixes.png'
    ],
    tipo:'artesanato',
    sobMedida: false
  },
  {
     nome: 'Pano de prato Cupcakes',
    tamanhos: ['45x60'],
    descricao: 'Doçura e charme na sua cozinh\nEsse pano de prato é a escolha perfeita pra quem ama detalhes delicados e cheios de encanto!\nCom uma estampa fofa de cupcakes em tons suaves, ele traz leveza e um toque doce para o seu dia a dia.\nEstampa delicada e charmosa\nAcabamento com passa-fita rosa.\nConfeccionados com o autêntico tecido pé de galinha, conhecido por sua excelente qualidade, alta absorção e durabilidade, esses panos são ideais para secar louças, enxugar as mãos e auxiliar em todas as tarefas do dia a dia. Esqueça aqueles panos que não secam de verdade e soltam fiapos!\n<strong>Características do Produto:</strong>\n- <i>Pano Legítimo Pé de Galinha:</i> 100% algodão, alvejado (super branco) e com a trama tradicional que garante a melhor absorção.\n- <i>Detalhes que Encantam:</i> Cada pano é cuidadosamente finalizado com barrados em tecido de tricoline 100% algodão, trazendo estampas vivas e cheias de personalidade.\n\nLeve o frescor do mar para sua casa!',
    preco: 20,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/q36Tb7f9/Cupcakes.png'
    ],
    tipo:'artesanato',
    sobMedida: false
  },
  {
    nome: 'Necessaire multiuso',
    tamanhos: [''],
    descricao: 'Feita em tricoline, essa necessaire é leve, resistente e cheia de charme. Possui alça lateral, que facilita o transporte e o uso no dia a dia.\nSuper versátil, pode ser usada como farmacinha, necessaire, estojo escolar ou para organizar itens pessoais dentro da bolsa, mochila ou mala. Ideal para levar maquiagem, remédios, itens de higiene, materiais escolares ou o que você precisar manter sempre à mão.\nUm acessório prático, funcional e com vários usos, perfeito para quem gosta de organização sem abrir mão de estilo.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/4nkTTP8Z/Necessaire-IA.png',
      'https://i.ibb.co/wFxzdYGy/IMG-8082.png',
      'https://i.ibb.co/Y4c0XjLV/IMG-8081.png',
      'https://i.ibb.co/JjYG5RKr/IMG-8080.png'
    ],
    observacao: '<strong>Personalize o Seu!</strong> Gostou do modelo, mas prefere outras cores ou estampas? Esta necessaire é personalizável!\n<strong>Tamanhos:</strong> Podemos confeccionar em diferentes dimensões para atender à sua necessidade.\n<strong>Estampas:</strong> Disponibilizamos um catálogo variado de estampas em tricoline.\nEntre em Contato para ver as opções de estampas, tamanhos e solicitar um orçamento, chame-nos no WhatsApp! Será um prazer criar uma peça única para você.\n',
    tipo:'artesanato',
    sobMedida: false
  },
  {
    nome: 'Kit Porta Filtro e Pano de prato',
    tamanhos: [''],
    descricao: 'Deixe sua cozinha mais prática e charmosa!\nEste porta filtro de café é ideal para organizar filtros de papel, mantendo tudo sempre à mão e com muito estilo.\nConfeccionado em tecido estampado, ele traz um toque alegre e acolhedor para o cantinho do café.\nPara completar, o conjunto pode ser combinado com pano de prato com barrado no mesmo tecido, criando uma composição harmoniosa e cheia de personalidade.\nFuncional, decorativo e perfeito para quem ama uma cozinha organizada e cheia de carinho.\nIdeal para presentear ou transformar seu cantinho do café!',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/5g6pvJHH/porta-filtro.jpg',
      'https://i.ibb.co/SwFfPgVf/IMG-8079.png',
      'https://i.ibb.co/ycP3SgT9/IMG-8078.png'
    ],
    observacao: '<strong>Personalize o Seu!</strong> Gostou do modelo, mas prefere outras cores ou estampas? Este kit é personalizável!\n<strong>Tamanhos:</strong> Podemos confeccionar em diferentes dimensões para atender à sua necessidade.\n<strong>Estampas:</strong> Disponibilizamos um catálogo variado de estampas em tricoline.\nEntre em Contato para ver as opções de estampas, tamanhos e solicitar um orçamento, chame-nos no WhatsApp! Será um prazer criar uma peça única para você.\n',
    tipo:'artesanato',
    sobMedida: false
  },
  {
    nome: 'Saquinho Multiuso G',
    tamanhos: ['G'],
    descricao: '<strong>Ideal para:</strong> Presentes especiais, lembrancinhas, necessaires improvisadas, organização de pequenas peças.\n<strong>Características:</strong>\n - <i>Material de Qualidade:</i> Confeccionado em tricoline 100% algodão, um tecido leve, macio e resistente, que garante um toque agradável e maior durabilidade.\n - <i>Estampa Delicada:</i> O corpo do saquinho exibe uma linda estampa floral, combinando flores vermelhas e amarelas sobre um fundo claro, adicionando um toque de charme e delicadeza. A barra superior e o interior possui um tecido de composição discreta, em poá bege, criando um contraste sutil e elegante.\n - <i>Fecho Prático:</i> Possui um fecho em cordão vermelho vibrante, que não só proporciona um fechamento seguro e rápido, mas também adiciona um ponto de cor marcante. As pontas do cordão são arrematadas com miçangas coloridas (amarelas, laranjas e peroladas), dando um toque artesanal e divertido.\n - <i>Multiuso:</i> Ideal como embalagem de presente reutilizável, saquinho organizador para viagens, porta-bijuterias, ou para guardar itens pessoais.\n - <i>Acabamento Artesanal:</i> Peça com acabamento cuidadoso, feita à mão, garantindo exclusividade e atenção aos detalhes.\n<strong>Medidas:</strong>',
    preco: 20,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/M5yJshgf/Saquinho-G-IA.png',
      'https://i.ibb.co/fsfcFDQ/Saco-GG-Fte.png',
      'https://i.ibb.co/tpcvNgTq/Saco-GG-Aberto.png'
    ],
    observacao: '<strong>Personalize o Seu!</strong> Gostou do modelo, mas prefere outras cores ou estampas? Este saquinho é personalizável!\n<strong>Tamanhos:</strong> Podemos confeccionar em diferentes dimensões para atender à sua necessidade.\n<strong>Estampas:</strong> Disponibilizamos um catálogo variado de estampas em tricoline.\nEntre em Contato para ver as opções de estampas, tamanhos e solicitar um orçamento, chame-nos no WhatsApp! Será um prazer criar uma peça única para você.\n',
    tipo:'artesanato',
    sobMedida: false
  },
  {
    nome: 'Saquinho Multiuso P',
    tamanhos: ['P'],
    descricao: '<strong>Ideal para:</strong> Presentes especiais, lembrancinhas, necessaires improvisadas, organização de pequenas peças.\n<strong>Características:</strong>\n- <i>Material de Qualidade:</i> Confeccionado em tricoline 100% algodão, um tecido leve, macio e resistente, que garante um toque agradável e maior durabilidade.\n- <i>Estampa Romântica:</i> O saquinho combina duas estampas harmoniosas: a parte inferior apresenta uma linda padronagem floral, com pequenas rosas em tons de vermelho e verde sobre um fundo rosa-claro (coral). A barra superior e o interior utilizam uma estampa de poás discretos no mesmo tom de rosa, criando uma composição doce e romântica.\n- <i>Fecho Prático:</i> Possui um fecho em cordão branco que contrasta elegantemente com o tecido, garantindo um fechamento seguro e rápido. As pontas do cordão são arrematadas com miçangas coloridas (verdes, laranjas e vermelhas), adicionando um charme artesanal e vibrante.\n - <i>Multiuso:</i> Ideal como embalagem de presente reutilizável, saquinho organizador para viagens, porta-bijuterias, ou para guardar itens pessoais.\n- <i>Acabamento Artesanal:</i> Peça com acabamento cuidadoso, feita à mão, garantindo exclusividade e atenção aos detalhes.\n<strong>Medidas:</strong>',
    preco: 10,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/Mynbp6h0/Saquinho-P-IA.png',
      'https://i.ibb.co/jP8JZxjD/IMG-6832-removebg-preview.png',
      'https://i.ibb.co/gZnKH3Ts/IMG-6833-removebg-preview.png'
    ],
    observacao:'<strong>Personalize o Seu!</strong> Gostou do modelo, mas prefere outras cores ou estampas? Este saquinho é personalizável!\n <strong>Tamanhos:</strong> Podemos confeccionar em diferentes dimensões para atender à sua necessidade.\n<strong>Estampas: </strong>Disponibilizamos um catálogo variado de estampas em tricoline.\nEntre em Contato para ver as opções de estampas, tamanhos e solicitar um orçamento, chame-nos no WhatsApp! Será um prazer criar uma peça única para você.',
    tipo:'artesanato',
    sobMedida: false
  },
  {
    nome: 'Pano Multiuso Cerejas',
    tamanhos: ['U'],
    descricao: 'Adicione um charme retrô e divertido à sua cozinha com nosso pano artesanal. Perfeito para manter seus alimentos frescos e protegidos com um toque de delicadeza.\n<strong>Características e Uso Ideal:</strong>\n<i>Estampa Vibrante:</i> O tecido do barrado apresenta um padrão alegre de quadriculado amarelo e branco, com charmosas cerejas vermelhas e hastes verdes. Uma estampa clássica que ilumina qualquer ambiente!\n<i>Função Principal:</i> Devido à trama do tecido, este pano é perfeito para cobrir e proteger alimentos, como bolos, pães, frutas e massas que estão crescendo. Ajuda a manter a umidade e a afastar insetos de forma higiênica e estilosa.\n<i>Decoração e Detalhes:</i> Ideal para forrar cestas de pães, bandejas de piquenique ou simplesmente decorar sua mesa e bancada.\n<i>Presente Prático:</i> Embalado com carinho em celofane e finalizado com um laço de fita verde, é uma excelente opção para presentear com bom gosto e utilidade.\n<strong>Medidas:</strong>\n- 45 x 66 cm.',
    preco: 15,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/KcXYcKy6/Pano-Cobrir-IA.png',
      'https://i.ibb.co/60htw4jK/Pano-Cereja.png',
      'https://i.ibb.co/wZsKcZ2W/Pano-Cobrir-Cerejas-removebg-preview.png'

    ],
    observacao:'\n<i>Importante:</i> Este pano é especificamente indicado para cobrir e forrar, não sendo ideal para secar louças devido à sua trama.',
    tipo:'artesanato',
    sobMedida: false
  },
  {
    nome: 'Pano Multiuso Poá Vermelho',
    tamanhos: ['U'],
    descricao: 'Adicione um toque vibrante e atemporal à sua cozinha com nosso pano artesanal. Perfeito para manter seus alimentos frescos e protegidos com o charme do design clássico.\n<strong>Características e Uso Ideal:</strong>\n<i>Estampa Clássica e Vibrante:</i> O tecido do barrado apresenta um charmoso padrão de Poá (bolinhas) brancas sobre um fundo vermelho intenso. Um visual clássico que traz alegria e destaque para qualquer mesa.\n<i>Função Principal:</i> Devido à trama do tecido, este pano é perfeito para cobrir e proteger alimentos, como bolos, pães, frutas e massas que estão crescendo. Ajuda a manter a umidade e a afastar insetos de forma higiênica e estilosa.\n<i>Decoração e Detalhes:</i> Ideal para forrar cestas de pães, bandejas de piquenique ou simplesmente decorar sua mesa e bancada.\n<i>Presente Prático:<i> Embalado cuidadosamente em celofane, finalizado com um laço de fita vermelha, é uma excelente opção para presentear com bom gosto e utilidade.\n<strong>Medidas:</strong>\n- 45 x 66 cm.',
    preco: 15,
    estoque: 1,
    imagens: [
    'https://i.ibb.co/3Yc5zfwc/Pano-Cobrir-V-IA.png',
    'https://i.ibb.co/1G05Qn6p/Pano-Bolinhas.png',
    'https://i.ibb.co/tpGfMKZX/Pano-Cobrir-Poa-removebg-preview.png'
    ],
    observacao:'<i>Importante:</i> Este pano é especificamente indicado para cobrir e forrar, não sendo ideal para secar louças devido à sua trama.',
    tipo:'artesanato',
    sobMedida: false
  },
  {
    nome: 'Kit pano de prato e puxa saco',
    tamanhos: ['U'],
    descricao: 'Transforme sua cozinha com este kit charmoso e funcional, que combina eficiência na secagem de louças e organização elegante. Um conjunto artesanal perfeito para presentear ou para você!\n<i>Itens do Kit:</i>\n<strong> Pano de Prato:</strong>\n- <i>Qualidade Comprovada:</i> Confeccionado com o legítimo tecido "Pé de Galinha", conhecido pela sua trama superior que garante a máxima absorção. É a escolha ideal para enxugar louças perfeitamente, sem soltar fiapos.\n- <i>Acabamento:</i> Possui uma barra decorativa em tecido estampado com doces coloridos, trazendo um visual divertido e encantador — perfeito para quem ama uma cozinha viva e cheia de personalidade.\n<strong>Puxa-Saco:</strong>\n- <i>Estampa Alegre:</i> Produzido em tecido tricoline 100% algodão com estampa de doces e balas coloridas, que adiciona um toque de descontração e charme ao ambiente.\n- <i>Funcionalidade:</i> Ideal para manter suas sacolas plásticas organizadas de forma discreta e elegante. Possui elásticos nas aberturas para facilitar tanto a colocação quanto a retirada das sacolas.\n<strong>Charme e Praticidade em Conjunto:</strong>\nEste kit não só otimiza suas tarefas na cozinha, mas também adiciona um toque campestre e romântico à decoração. Os tecidos combinam perfeitamente, criando uma harmonia visual única.\n<strong>Medidas:</strong>\n-Pano de prato: 45 x 66 cm.\n- Puxa-saco: 21 x 52 cm.',
    preco: 30,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/0pPq9tnV/Pano-Doces.png',
      'https://i.ibb.co/NdGQT1N7/Kit.png',
      'https://i.ibb.co/Zzjh4DMZ/PuxaSaco.png'
    ],
    observacao:'',
    tipo:'artesanato',
    sobMedida: true
  },
  {
    nome: 'Kit com 2 Panos de prato',
    tamanhos: ['U'],
    descricao: 'Confeccionados com o autêntico tecido pé de galinha, conhecido por sua excelente qualidade, alta absorção e durabilidade, esses panos são ideais para secar louças, enxugar as mãos e auxiliar em todas as tarefas do dia a dia. Esqueça aqueles panos que não secam de verdade e soltam fiapos!\n<strong>Características do Produto:</strong>\n- <i>Pano Legítimo Pé de Galinha:</i> 100% algodão, alvejado (super branco) e com a trama tradicional que garante a melhor absorção.\n- <i>Detalhes que Encantam:</i> Cada pano é cuidadosamente finalizado com barrados em tecido de tricoline 100% algodão, trazendo estampas vivas e cheias de personalidade:\n- Um pano com divertida estampa de galinhas pretas e brancas - perfeito para quem ama um toque campestre e alegre.\n- Um pano com vibrante estampa de flores e mandalas em tons de amarelo e vermelho - que ilumina e moderniza o ambiente.\n- <i>Qualidade e Praticidade:</i> Além de lindos, são resistentes e podem ser lavados com frequência, mantendo a maciez e o poder de secagem.\nSeja para uso próprio, para presentear alguém especial ou para complementar a decoração da sua casa, este kit é a união perfeita de beleza artesanal e utilidade imbatível.\nLeve já para casa o charme e a qualidade que a sua cozinha merece!\n<strong>Medidas:</strong>\n- 45 x 66 cm.',
    preco: 30,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/xKHLbvgk/Pano-Mistico.png',
      'https://i.ibb.co/DHvNnsqG/Kit-Panos.png',
      'https://i.ibb.co/G4LxwR0x/Pano-Galinha.png'
    ],
    observacao:'',
    tipo:'artesanato',
    sobMedida: false
  },{
    nome: 'Kit com 2 Panos de prato',
    tamanhos: ['U'],
    descricao: 'Confeccionados com o autêntico tecido pé de galinha, conhecido por sua excelente qualidade, alta absorção e durabilidade, esses panos são ideais para secar louças, enxugar as mãos e auxiliar em todas as tarefas do dia a dia. Esqueça aqueles panos que não secam de verdade e soltam fiapos!\n<strong>Características do Produto:</strong>\n- <i>Pano Legítimo Pé de Galinha:</i> 100% algodão, alvejado (super branco) e com a trama tradicional que garante a melhor absorção.\n- <i>Detalhes que Encantam:</i> Cada pano é cuidadosamente finalizado com barrados em tecido de tricoline 100% algodão, trazendo estampas vivas e cheias de personalidade:\n- Um pano com divertida estampa de galinhas pretas e brancas - perfeito para quem ama um toque campestre e alegre.\n- Um pano com vibrante estampa de flores e mandalas em tons de amarelo e vermelho - que ilumina e moderniza o ambiente.\n- <i>Qualidade e Praticidade:</i> Além de lindos, são resistentes e podem ser lavados com frequência, mantendo a maciez e o poder de secagem.\nSeja para uso próprio, para presentear alguém especial ou para complementar a decoração da sua casa, este kit é a união perfeita de beleza artesanal e utilidade imbatível.\nLeve já para casa o charme e a qualidade que a sua cozinha merece!\n<strong>Medidas:</strong>\n- 45 x 66 cm.',
    preco: 30,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/xKHLbvgk/Pano-Mistico.png',
      'https://i.ibb.co/DHvNnsqG/Kit-Panos.png',
      'https://i.ibb.co/G4LxwR0x/Pano-Galinha.png'
    ],
    observacao:'',
    tipo:'artesanato',
    sobMedida: false
  },
];
@Component({
  selector: 'app-prontas',
  standalone: true,
  templateUrl: './prontas.html',
  styleUrls: ['./prontas.css'],
  imports: [CommonModule, RouterModule, MatTabsModule, FormsModule]
})

export class Prontas {
  produtos = modelosProntas;
  showBackToTop = true;
  tamanhoSelecionado: { [key: string]: string } = {};
  constructor(private carrinhoService: CarrinhoService, private dialog: MatDialog) {}
  abas = ["Inverno ❄️", "Verão ☀️", "Meia Estação 🍂", "Acessórios 🎀", "Artesanato 🧵"];
  abaAtiva = 0;
  isMenuOpen: boolean = false;


  mudarAba(i: number) {
    this.abaAtiva = i;
  }

  comprar(modelo: { nome: string; imagens: string[]; preco: number }) {
    const tamanho = this.tamanhoSelecionado[modelo.nome];
    const item: CarrinhoItem = {
      tipo: 'pronta',
      nomeModelo: `${modelo.nome} - ${tamanho}`,
      imagens: modelo.imagens,
      preco: modelo.preco,
    };

    this.carrinhoService.addItem(item);
    this.dialog.open(MsgSucesso, {
      width: '400px',
      data: { nome: `${modelo.nome} - ${tamanho}` },
      panelClass: 'custom-modal'
    });
  }

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

      case "maiorValor":
        this.produtos.sort((a, b) => b.preco - a.preco);
        break;

      case "menorValor":
        this.produtos.sort((a, b) => a.preco - b.preco);
        break;

      default:
        break;
    }
  }
}
