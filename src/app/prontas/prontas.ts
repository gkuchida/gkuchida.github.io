import { Component, HostListener  } from '@angular/core';
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
    tamanhos: string[];
    descricao: string;
    preco: number;
    estoque: number;
    imagens: string [];
    observacao?: string;
    isNovidade?: boolean;
    tipo?: 'inverno'|'verao'|'chuva'|'acessorios'|string;
    genero?:string;
}

export const modelosProntas =[
   {
    nome: 'Vestido Soft + Jeans M',
    tamanhos: ['M'],
    descricao: 'Deixe sua pet quentinha e estilosa com esta roupinha super fofa! \nA parte superior em soft peludinho apresenta estampas divertidas de animais marinhos sorridentes, garantindo charme e alegria.\nA parte inferior em jeans dá um toque de modernidade e praticidade.\n\n*Tecidos:* Soft, Jeans, Microsoft e Pele.\n*Cor*: Branco com desenhos de animais marinhos, jeans, amarelo.\n*Medidas:*\n- Pescoço: 44cm.\n- Tórax: 54cm.\n- Comprimento: 48cm.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/9H1Q3QjC/Vestido-Jeans-Fte-removebg-preview.png',
      'https://i.ibb.co/tp0Pm9hk/IMG-7036.png',
      'https://i.ibb.co/jkxS2Vh4/Vestido-jeans-IA.png'
    ],
    observacao:'',
    isNovidade: false,
    tipo:'inverno',
    genero:'menina'
  },
  {
    nome: 'Vestido Babadinho P',
    tamanhos: ['P'],
    descricao: 'A peça ideal para aquecer e encantar! \nEste lindo vestido é confeccionado em soft quentinho, o tecido perfeito para garantir o bem-estar da sua companheira nos dias frios.\nA estampa de ursinhos e corações sobre o fundo amarelo é alegre e vibrante. O babado delicado na barra confere um charme extra e um visual super fofo.\nGaranta já o conforto e a fofura que a sua pet precisa!\n\n*Tecido:* Soft.\n*Cor:* Amarelo com desenhos de ursos cinza e corações rosa.\n*Medidas:*\n- Pescoço: 40cm.\n- Tórax: 44cm.\n- Comprimento: 30cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/Gv0TwX2f/Vestido-Babado-Fte-removebg-preview.png',
      'https://i.ibb.co/Z6ndjTrD/IMG-7037.png',
      'https://i.ibb.co/b5Wg3hcy/Vestido-Babado-IA.png'
    ],
    isNovidade: false,
    tipo:'inverno',
    genero:'menina'
  },
  {
    nome: 'Capa Dupla Face G',
    tamanhos: ['G'],
    descricao: 'A roupa perfeita para aquecer com zero estresse!\nEste lindo colete é feito em soft (material externo), e para um conforto e aquecimento extra, possui forro interno em Microsoft amarelo liso, garantindo um toque super agradável e o calor que seu pet merece. \nO charme fica por conta da estampa de ursinhos do amor em um fundo amarelo alegre.\nA maior vantagem deste modelo é a sua facilidade de uso: ele é totalmente ajustável graças ao fechamento em velcro no pescoço e barriga. Esqueça a dificuldade de vestir; basta envolver e prender!\nPraticidade, aconchego e estilo em um só colete.\n\n*Tecidos:* Soft externo e Microsoft interno.\n*Cor:* Amarelo com desenhos de ursos cinza e corações rosa.\n*Medidas:*\n- Pescoço: 48 a 55cm.\n- Tórax: 54 a 63cm.\n- Comprimento: 44cm.',
    preco: 35,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/8nbDNnZQ/IMG-6574.png',
      'https://i.ibb.co/Z1fkn1hr/IMG-6710.png',
      'https://i.ibb.co/PvS1XC0G/Capa-DF-IA.png'
    ],
    isNovidade: false,
    tipo:'inverno',
    genero:'menina'
  },
  {
    nome: 'Básica P',
    tamanhos: ['P'],
    descricao: 'Prepare-se para esmagar de tanta fofura! \nEsta blusa básica é feita em fleece extra macio e possui uma estampa lúdica de bichinhos coloridos (elefantes, leões, macacos) sobre um charmoso fundo pink claro.\nCom o seu acabamento em ribana de algodão, a peça garante durabilidade e um toque vibrante. \nO conforto térmico é garantido, sendo perfeita para noites frescas ou para relaxar dentro de casa.\nDeixe sua pet super confortável e pronta para qualquer aventura com essa peça alegre!\n\n*Tecido:* Fleece com acabamento de ribanas rosa.\n*Cor:* Rosa com desenhos coloridos de animais (marrom, azul, verde, amarelo).\n*Medidas:*\n- Pescoço: 22cm.\n- Tórax: 48cm.\n- Comprimento: 35cm.',
    preco: 20,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/qYVJ8595/IMG-6841.png',
      'https://i.ibb.co/mFBhFW5v/IMG-6448.png',
      'https://i.ibb.co/tTSwCByy/Basica-PP-IA.png'
    ],
    isNovidade: false,
    tipo:'inverno',
    genero:'menina'
  },
  {
    nome: 'Básica GG',
    tamanhos: ['GG'],
    descricao: 'Cães grandes sente frio?\n Sim, eles também sentem! \nE encontrar roupas fofas para eles pode ser um desafio. \nEsta peça é a solução perfeita!\n Esta linda blusa básica é confeccionada em soft quentinho, o tecido ideal para garantir o conforto da sua pet nos dias mais frios ou na hora de dormir.\nA estampa de ursinhos nas nuvens sobre o fundo rosa bebê é pura doçura, com acabamentos em ribana de algodão preto dão um toque de estilo.\nGaranta já o aconchego e a fofura que a sua gigante precisa!\n\n*Tecido:* Soft com acabamento de ribanas preta.\n*Cor:* Rosa com desenhos de ursos amarelos e nuvens brancas.\n*Medidas:*\n- Pescoço: 52cm.\n- Tórax: 66cm.\n- Comprimento: 50cm.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/BHR80ZRj/IMG-6044.png',
      'https://i.ibb.co/PvFd9cTr/IMG-6045.png',
      'https://i.ibb.co/279LXZ65/Basica-GG-IA.png'
    ],
    isNovidade: false,
    tipo:'inverno',
    genero:'menina'
  },
  {
    nome: 'Básica G',
    tamanhos: ['G'],
    descricao: 'A peça ideal para aquecer e encantar!\nEsta linda blusa básica é confeccionada em soft quentinho, o tecido perfeito para garantir o bem-estar da sua companheira nos dias mais frios ou na hora de dormir.\nA estampa de ursinhos nas nuvens sobre o fundo rosa bebê é pura doçura, destacada pelos acabamentos em ribana de algodão pink vibrante na gola e nas mangas, trazendo um charme extra.\nGaranta já o conforto e a fofura que a sua pet precisa!\n\n*Tecido:* Soft com acabamento de ribanas rosa.\n*Cor:* Rosa com desenhos ursos amarelos e nuvens brancas.\n*Medidas:*\n- Pescoço: 34cm.\n- Tórax: 52cm.\n- Comprimento: 40cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/JRC5kzHt/IMG-5682.png',
      'https://i.ibb.co/qYBWsDLb/IMG-5681.png',
      'https://i.ibb.co/Kxncn8Fs/Basica-M-IA.png'
    ],
    isNovidade: false,
    tipo:'inverno',
    genero:'menina'
  },
  {
    nome: 'Básica Azul PP',
    tamanhos: ['PP'],
    descricao: 'A peça ideal para aquecer e proteger!\nEsta linda blusa básica é confeccionada em soft de dupla camada (revestida/forrada), o tecido perfeito para garantir o dobro do calor e o bem-estar do seu pet nos dias mais frios.\nA estampa moderna em tons de azul, vermelho e cinza sobre o fundo claro é super estilosa, e os acabamentos em ribana de algodão vermelho na gola e nas cavas dão um toque vibrante de cor.\nO revestimento interno em microsoft amarelo bebê garante que ele fique ainda mais quentinho.\nPossui abertura discreta no pescoço para a passagem da guia/coleira, tornando os passeios rápidos e fáceis sem precisar tirar a roupinha.\nGaranta já o dobro de aconchego e estilo para o seu companheiro!\n\n*Tecido:* Soft externo, Microsoft interno com acabamento de ribanas vermelha.\n*Cor:* Azul com desenhos azul e vermelho. Interno na cor amarelo.\n*Medidas:*\n- Pescoço: 28cm.\n- Tórax: 44cm.\n- Comprimento: 27cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/8DRKM884/IMG-6948.png',
      'https://i.ibb.co/X0c07nq/IMG-6721.png',
      'https://i.ibb.co/8LQPcCjK/Basica-PP-IA.png'
    ],
    isNovidade: false,
    tipo:'inverno',
    genero:'menino'
  },
  {
    nome: 'Blusa Raglan M',
    tamanhos: ['M'],
    descricao: 'A peça ideal para aquecer e manter o estilo do seu pet aventureiro!\n Esta linda blusa é confeccionada em soft quentinho, o tecido perfeito para garantir o bem-estar do seu companheiro nos dias mais frescos.\n A estampa é vibrante, com um fundo vermelho vivo e uma divertida equipe de caminhões e máquinas de construção, dando ao seu pet um look cheio de personalidade.\n O corte Raglan proporciona um visual estiloso e garante excelente mobilidade, e para a hora do passeio.\n Garanta já o conforto e a diversão que o seu pet precisa para qualquer missão, dentro ou fora de casa!\n\n*Tecido:* Soft com acabamento de ribanas vermelha.\n*Cor:* Vermelho com desenhos de caminhões e trator azul e amarelo.\n*Medidas:*\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/8DfZ0msC/Blusa-Raglan-Fte.png',
      'https://i.ibb.co/Cs8M9q5L/Blusa-Raglan-Verso.png',
      'https://i.ibb.co/7Nj1p6pk/Raglan-IA.png'
    ],
    tipo:'inverno',
    genero:'menino'
  },
  {
    nome: 'Básica Vermelha PP',
    tamanhos: ['PP'],
    descricao: 'A peça ideal para aquecer e encantar seu pet de pequeno porte!\nEsta linda blusa básica é confeccionada em fleece quentinho e macio, o tecido perfeito para garantir o bem-estar e o conforto da sua companheira nos dias mais frescos.\n A estampa é divertida, com um fundo vermelho vivo e adoráveis abelhinhas sorridentes, dando um charme inconfundível.\nPensada no conforto e segurança dos pets menores, a blusa conta com abertura no pescoço para a passagem da guia/coleira, facilitando o passeio.\n Garanta já o conforto e a fofura que o seu pequeno pet precisa!\n\n*Tecido:* Fleece com acabamento em fleece.\n*Cor:* Vermelho com desenhos de abelhas.\n*Medidas:*\n- Pescoço: 41cm.\n- Tórax: 51cm.\n- Comprimento: 37cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/G4n31LzC/IMG-6722.png',
      'https://i.ibb.co/HLD43J8K/Abelhinha-Fte.png',
      'https://i.ibb.co/3ycJW3j7/Basica-PP-IA.png'
    ],
    tipo:'inverno',
    genero:'menina'
  },
  {
    nome: 'Capa de chuva Bagun G',
    tamanhos: ['G'],
    descricao: 'Garanta que seu pet se mantenha seco e estiloso nos dias de chuva!\nEsta capa é confeccionada em Nylon Bagun, um tecido técnico de alta resistência e maior rigidez, que confere um caimento estruturado à peça, além de ser totalmente impermeável, protegendo seu companheiro da umidade.\nO design funcional conta com capuz para proteger a cabeça e as orelhas e um fechamento prático e seguro em velcro na barriga e no pescoço, permitindo um ajuste rápido e perfeito na hora de sair.\n O charme final fica por conta do acabamento em viés de algodão (amarelo), que confere um toque moderno e sofisticado.\nProteção garantida com a durabilidade e a qualidade que o Nylon Bagun oferece!\n*Atenção:* Este modelo oferece ótima proteção contra a maioria das chuvas, mas não é projetado para enfrentar temporais fortes.\n\n*Tecido:* Nylon Bagun.\n*Cor:* Azul marinho.\n*Medidas:*\n- Pescoço: 48 a 56 cm.\n- Tórax: 60 a 66 cm.\n- Comprimento: 46 cm.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/7Jyx4wWc/Capa-Bagun-Costas.png',
      'https://i.ibb.co/HjSKcJz/Capa-Bagun-FTE.png',
      'https://i.ibb.co/fY8gDWvr/Bagun-IA.png'
    ],
    observacao: '',
    isNovidade: true,
    tipo:'chuva',
    genero:'menino'
  },
  {
    nome: 'Capa de chuva transpasse G',
    tamanhos: ['G'],
    descricao: 'Mantenha seu pet seco com uma capa que oferece proteção de qualidade e é super prática para os passeios!\n Esta capa é confeccionada em Nylon 70, um tecido conhecido por sua leveza, resistência a rasgos e por ser o mesmo material utilizado em guarda-chuvas, garantindo sua eficácia como impermeável. \nO design funcional conta com capuz para proteger a cabeça e as orelhas e uma passagem para coleira/guia na região do pescoço, facilitando o uso sem comprometer a proteção. \nAlém disso, ela possui fechamento em velcro tanto no pescoço quanto na barriga, assegurando um ajuste rápido, seguro e muito confortável.\n Garanta já esta capa indispensável para que a chuva nunca mais cancele o passeio!\n*Atenção:* Este modelo oferece ótima proteção contra a maioria das chuvas, mas não é projetado para enfrentar temporais fortes.\n\n*Tecido:* Nylon 70.\n*Cor:* Azul claro. \n*Medidas:*\n- Pescoço: 50 a 55 cm.\n- Tórax: 54 a 62 cm.\n- Comprimento: 36 cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/cXsVFZJv/Capa-Nylon-Transpasse-FTE.png',
      'https://i.ibb.co/FZ2x3mt/Capa-Nylon-Transpasse-Costas.png',
      'https://i.ibb.co/FbNZjDpT/Capa-G-IA.png'
    ],
    observacao: '',
    isNovidade: true,
    tipo:'chuva',
    genero:'menino'
  },
  {
    nome: 'Capa de chuva G',
    tamanhos: ['G'],
    descricao: 'Mantenha seu pet seco com uma capa que oferece proteção de qualidade e é super prática para os passeios!\n Esta capa é confeccionada em Nylon 70, um tecido conhecido por sua leveza, resistência a rasgos e por ser o mesmo material utilizado em guarda-chuvas, garantindo sua eficácia como impermeável. \nO design funcional conta com capuz para proteger a cabeça e as orelhas e uma passagem para coleira/guia na região do pescoço, facilitando o uso sem comprometer a proteção. \nAlém disso, ela possui fechamento em velcro tanto no pescoço quanto na barriga, assegurando um ajuste rápido, seguro e muito confortável.\n Garanta já esta capa indispensável para que a chuva nunca mais cancele o passeio!\n*Atenção:* Este modelo oferece ótima proteção contra a maioria das chuvas, mas não é projetado para enfrentar temporais fortes.\n\n*Tecido:*  Nylon 70.\n*Cor:* Azul claro.\n*Medidas:*\n- Pescoço: 43 a 47 cm.\n- Tórax: 67 a 72 cm.\n- Comprimento: 46 cm.',
    preco: 30,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/rKFNFnrF/Capa-Nylon-FTE.png',
      'https://i.ibb.co/Y7mFJLnm/Capa-Nylon-Costas.png',
      'https://i.ibb.co/FbNZjDpT/Capa-G-IA.png',
    ],
    observacao: '',
    isNovidade: true,
    tipo:'chuva',
    genero:'menino'
  },
  {
    nome: 'Capa de chuva M',
    tamanhos: ['M'],
    descricao: 'Mantenha seu pet seco com uma capa que oferece proteção de qualidade e é super prática para os passeios!\n Esta capa é confeccionada em Nylon 70, um tecido conhecido por sua leveza, resistência a rasgos e por ser o mesmo material utilizado em guarda-chuvas, garantindo sua eficácia como impermeável. \nO design funcional conta com capuz para proteger a cabeça e as orelhas e uma passagem para coleira/guia na região do pescoço, facilitando o uso sem comprometer a proteção. \nAlém disso, ela possui fechamento em velcro tanto no pescoço quanto na barriga, assegurando um ajuste rápido, seguro e muito confortável, além do acabamento em viés de algodão vermelho.\n Garanta já esta capa indispensável para que a chuva nunca mais cancele o passeio!\n*Atenção:* Este modelo oferece ótima proteção contra a maioria das chuvas, mas não é projetado para enfrentar temporais fortes.\n\n*Tecido:*  Nylon 70.\n*Cor:* Vermelho escuro.\n*Medidas:*\n- Pescoço: 40 cm.\n- Tórax: 60 a 70 cm.\n- Comprimento: 40 cm.',
    preco: 25,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/fzDb0X3n/Capa-Vermelha-M-Fte.png',
      'https://i.ibb.co/C3KCBwWR/Capa-Vermelha-M-Costas.png',
      'https://i.ibb.co/M5sYPf4f/Capa-M-IA.png'
    ],
    observacao: '',
    isNovidade: true,
    tipo:'chuva',
    genero:'menina'
  },
  {
    nome: 'Gorro de Natal',
    tamanhos: [
      'P com desenho',
      'M com desenho',
      'M liso',
      'G liso'
    ],
    descricao: '🎅 Deixe o Natal do seu Pet ainda mais Mágico!\nO (a) seu (sua) melhor amigo (a) merece entrar no clima natalino com muito estilo e conforto! Apresentamos o nosso charmoso Gorro de Natal Pet, perfeito para fotos inesquecíveis e momentos de festa.\n<strong>Características e Estilo:</strong>\n- <i>Tecido de Qualidade:</i> Confeccionado em tricoline de toque suave.\n- <i>Ajuste Perfeito:</i> Pensado para o conforto, possui elástico para garantir que não caia durante a diversão.\n- <i>Segurança e Praticidade:</i> Conta com um moderno fechamento com ponteira "focinho de porco", que permite um ajuste fácil e seguro.\n- <i>Estilo Único:</i> O vermelho vibrante, o pompom fofo e a barra felpuda branca combinam com a alegria da época.\n✨ Encomende Sob Medida! Se o seu pet é de um tamanho especial, não se preocupe! Fazemos o gorro em outros tamanhos por encomenda. Garanta que ele fique perfeito para o seu companheiro!\nMande uma mensagem e peça o seu!\n*Medidas:*\n- P: 10x15cm (LxA)\n- M: 12x18cm (LxA)\n- G: 22x31cm (LxA).',
    preco: 10,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/LXk4stDX/Gorro-G-deitado.png',
      'https://i.ibb.co/QjMGD1G6/Gorro-P-Desenho-Leg.png',
      'https://i.ibb.co/DHF1Bp9M/Gorro-M-Desenho.png',
      'https://i.ibb.co/fd8Wm08C/Gorro-G-M.png',
      'https://i.ibb.co/GfkH7V2T/Miyu-Gorro.png'
    ],
    observacao: 'Garanta o seu, pois a produção é limitada!',
    isNovidade: true,
    tipo:'acessorios',
    genero: 'unissex'
  },
  {
    nome: 'Bandana com elástico Pets Verde P',
    tamanhos: ['P'],
    descricao: 'Quer renovar o visual do seu pet com praticidade e muito estilo? \n Conheça a nossa Bandana Pet com Elástico, a peça perfeita para o seu amiguinho!\n<strong>Características e Estilo:</strong>\n- <i>Design Divertido e Dupla Face:</i> Com uma estampa principal de cachorrinhos fofos, casinhas e patinhas (ver imagem 1), e um verso liso em poá bege discreto (ver imagem 2), você tem duas opções de estilo em uma só peça!\n- <i>Ajuste Perfeito com Elástico:</i> Diga adeus aos nós! O acabamento em elástico (ver imagem 2) garante um vestir fácil, seguro e super confortável, adaptando-se suavemente ao pescoço do seu pet sem apertar.\n- <i>Qualidade e Durabilidade:</i> Feita com tecidos macios e resistentes, nossa bandana é ideal para o uso diário e aguenta as aventuras do seu amigão.\nEstilo e praticidade juntos? Só com a nossa Bandana Pet Duo! Garanta já a do seu pet!\n*Medidas:*\n- Pescoço: 41 a 50 cm.\n- Comprimento: 15 cm.',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/HLcsB12f/Bandana-El-stico-Verde-Fte.png',
      'https://i.ibb.co/wFdv2XgZ/Bandana-El-stico-Verde-Costas.png',
      'https://i.ibb.co/6R7HtRPJ/Bandana-Elastico-IA.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'acessorios',
    genero: 'unissex'
  },
  {
    nome: 'Bandana Flamingos P',
    tamanhos: ['P'],
    descricao: 'Adicione um toque de estilo e personalidade com esta bandana dupla face! Uma peça versátil que oferece duas opções de look em uma só.\n<strong>Características e Estilo:</strong>\n- <i>Dupla Face e Versátil:</i> Oferece duas estampas, permitindo mudar o visual em segundos.\n<i>- Lado 1 (Estampado):</i> Apresenta uma estampa divertida e moderna com tema tropical, incluindo flamingos, flores coloridas e detalhes como óculos de sol, tudo sobre um fundo claro/rosa pálido. É o lado perfeito para um visual alegre e descontraído.\n- <i>Lado 2 (Cor Sólida):</i> Confeccionado em tricoline pink vibrante, este lado é ideal para um look mais marcante e estiloso.\n- <i>Material de Qualidade:</i> Feita em tricoline 100% algodão, o tecido é macio e confortável, ideal para uso prolongado.\n- <i>Fecho Prático e Seguro:</i> Possui um fecho de botões de pressão (dois botões pink), que garante um ajuste fácil, rápido e seguro, sem risco de desamarrar.\n*Medidas:*\n- Pescoço: 23 a 30 cm.\n- Comprimento: 15 cm.',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/jvCg57Qp/BPink-Fte-removebg-preview.png',
      'https://i.ibb.co/Kz5ZM3jL/BPink-Vers-removebg-preview.png',
      'https://i.ibb.co/JRsqyrdc/BPink-Tras-removebg-preview.png',
      'https://i.ibb.co/WNvxFkVw/Bandana-Fla-Pink-IA.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'acessorios',
    genero:'unissex'
  },
  {
    nome: 'Bandana Safari M',
    tamanhos: ['M'],
    descricao: 'Adicione um toque de estilo e personalidade com esta bandana dupla face! Uma peça versátil que oferece duas opções de look em uma só.\n<strong>Características e Estilo:</strong>\n- <i>Dupla Face e Versátil:</i> Oferece duas estampas, permitindo mudar o visual em segundos.\n<i>- Lado 1 (Estampado - Safari Moderno):</i> Apresenta uma estampa animada com um tema de selva/safari, incluindo leões, tucanos, macacos e folhagens tropicais, tudo sobre um fundo listrado em preto e cru. É um visual alegre e cheio de personalidade!\n- <i>Lado 2 (Cor Sólida - Verde Esmeralda):</i> Confeccionado em tricoline verde esmeralda vibrante, este lado oferece uma opção mais clássica e intensa, realçando a cor dos olhos ou da pelagem.\n- <i>Material de Qualidade:</i> Feita em tricoline 100% algodão, o tecido é macio e confortável, ideal para uso prolongado.\n- <i>Fecho Prático e Seguro:</i> Possui um fecho de botão de pressão na cor verde, que garante um ajuste fácil, rápido e seguro, sem risco de desamarrar ou incomodar.\n*Medidas:*\n- Pescoço: 38 cm.\n- Comprimento: 20 cm.',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/DgSwqwjg/BVer-fte-removebg-preview.png',
      'https://i.ibb.co/svWrz5Jq/BVer-costas-removebg-preview.png',
      'https://i.ibb.co/hJPQD58F/BVer-tras-removebg-preview.png',
      'https://i.ibb.co/fVDV8S14/Bandana-Safari-IA.png'
    ],
     observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'acessorios',
    genero:'menino'
  },
  {
    nome: 'Bandana Flamingos M',
    tamanhos: ['M'],
    descricao: 'Adicione um toque de estilo e personalidade com esta bandana dupla face! Uma peça versátil que oferece duas opções de look em uma só.\n<strong>Características e Estilo:</strong>\n- <i>Dupla Face e Versátil:</i> Oferece duas estampas, permitindo mudar o visual em segundos.\n<i>- Lado 1 (Estampado):</i> Apresenta uma estampa divertida e moderna com tema tropical, incluindo flamingos, flores coloridas e detalhes como óculos de sol, tudo sobre um fundo claro/rosa pálido. É o lado perfeito para um visual alegre e descontraído.\n- <i>Lado 2 (Cor Sólida):</i> Confeccionado em tricoline laranjado, este lado é ideal para um look mais marcante e estiloso.\n- <i>Material de Qualidade:</i> Feita em tricoline 100% algodão, o tecido é macio e confortável, ideal para uso prolongado.\n- <i>Fecho Prático e Seguro:</i> Possui um fecho de botões de pressão (dois botões laranjados), que garante um ajuste fácil, rápido e seguro, sem risco de desamarrar.\n*Medidas:*\n- Pescoço: 24 a 30 cm.\n- Comprimento: 17 cm.',
    preco: 15,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/SXqzWSp7/Blar-Fte-removebg-preview.png',
      'https://i.ibb.co/wFvTjLVq/blar-removebg-preview.png',
      'https://i.ibb.co/d4zRMd8H/blar-tras-removebg-preview.png',
      'https://i.ibb.co/R49Zch1Z/Banda-Flamingo-IA.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'acessorios',
    genero:'menina'
  },
  {
    nome: 'Vestido Tigre Jeans GG',
    tamanhos: ['GG'],
    descricao: 'Sua pet vai desfilar charme por onde passar com este vestido adorável e super estiloso!\n Confeccionado para unir conforto e muito estilo, este modelo é perfeito para cães que amam se destacar.\n <strong>Características do Look:</strong>\n- <i>Estampa Divertida e Fofa:</i> A parte de cima é feita em tecido leve de algodão com uma estampa alegre de oncinhas, arco-íris e flores. Um visual delicado e cheio de vida.\n- <i>Saia Jeans Elegante:</i> A saia em jeans escuro com pregas confere um caimento lindo e sofisticado, ideal para passeios e ocasiões especiais. O jeans também garante maior durabilidade.\n- <i>Toque de Cor:</i> O detalhe da faixa vermelha na cintura cria um contraste vibrante, adicionando um toque de cor que realça toda a peça.\n- <i>Conforto em Primeiro Lugar:</i> O modelo estilo frente única ou de alças garante que a roupinha seja fácil de vestir e confortável para que sua pet se movimente livremente. É perfeita para o dia a dia e para encontros no parque.\n Este vestido é ideal para quem busca uma peça que é puro charme, feita com qualidade e pensada no bem-estar do seu bichinho.\n Vista sua pet com alegria e estilo!\n*Medidas:*\n- Pescoço: 48 a 56 cm.\n- Tórax: 54 a 60 cm.\n- Comprimento: 49 cm.',
    preco: 45,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/CpQp70wv/IMG-7589.png',
      'https://i.ibb.co/4ZtLtvZd/IMG-7590.png',
      'https://i.ibb.co/fdSVF6nd/Vestido-Jeans-IA.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina'
  },
  {
    nome: 'Vestido Safári Rosa GG',
    tamanhos: ['GG'],
    descricao: 'Prepare-se para uma expedição fashion! \nEste vestido encantador transforma sua pet em uma verdadeira aventureira, sem abrir mão da delicadeza. É a combinação perfeita de diversão e leveza para os passeios.\n<strong>Detalhes Exclusivos que Amamos:</strong>\n- <i>Estampa de Safari Lúdica:</i> A parte de cima é feita em tecido de algodão com uma estampa vibrante e divertida de bichinhos do safari: leões, zebras, girafas, macaquinhos e jacarés sobre um fundo rosa claro. Uma graça que chama a atenção!\n- <i>Saia de Princesa:</i> A saia é composta por camadas de tecido leve, com um toque de organza rosa bebê. O volume e a leveza dão um efeito "princesa" e garantem muito movimento e charme ao caminhar.\n- <i>Design Confortável:</i> O modelo estilo frente única ou de alças é prático, fácil de colocar e permite que sua pet brinque e se divirta com total conforto e liberdade.\n- <i>Perfeito para Fotos:</i> É o look ideal para comemorar aniversários, tirar fotos temáticas ou simplesmente fazer um passeio cheio de estilo.\nEste vestido é a escolha certa para a pet que é corajosa como um leãozinho e meiga como uma princesa!\nLeve a alegria do safari para o guarda-roupa da sua melhor amiga!\n*Medidas:*\n- Pescoço: 44 a 52 cm.\n- Tórax: 60 a 70 cm.\n- Comprimento: 53 cm.',
    preco: 45,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/JFgDQBwG/IMG-7593.png',
      'https://i.ibb.co/W4mmyJr0/IMG-7594.png',
      'https://i.ibb.co/DfbJLQSh/RP-Festa-Zoo-Miyu.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina'
  },
  {
    nome: 'Vestido Marinheiro GG',
    tamanhos: ['GG'],
    descricao: 'Sua pet pronta para navegar em grande estilo!\n Esta fantasia de marinheira é um clássico que une o charme tradicional dos uniformes náuticos com o conforto que sua melhor amiga merece.\nPerfeita para festas a fantasia, ensaios fotográficos ou para aqueles passeios onde a elegância é obrigatória!\n<strong>Detalhes que fazem a diferença:</strong>\n- <i>Estilo Marinheiro Autêntico:</i> O destaque fica por conta da gola grande em azul-marinho com acabamento em viés branco, imitando o tradicional colarinho "Seifuku" (estilo marinheiro japonês/escolar).\n- <i>Laço Vermelho Vibrante:</i> Um lindo laço em cetim vermelho decora a frente, adicionando um toque de cor e feminilidade, e contrastando perfeitamente com o azul e o branco.\n- <i>Combinação de Cores Clássica:</i> As cores azul-marinho, branco e vermelho criam um visual atemporal e muito elegante.\n- <i>Saia Rodada:</i> A saia em azul-marinho, com pregas, dá volume e movimento, garantindo que sua pet fique linda e tenha total liberdade para se movimentar.\n- <i>Conforto na Fantasia:</i> Feito com tecidos leves e pensado para ser prático, este modelo garante que a diversão não seja interrompida pelo desconforto.\nVista sua pet com este look clássico e garanta que ela seja o centro das atenções em qualquer evento!\n*Medidas:*\n- Pescoço: 48 a 54 cm.\n- Tórax: 60 a 64 cm.\n- Comprimento: 47 cm.',
    preco: 45,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/SXpz0q86/IMG-7591.png',
      'https://i.ibb.co/rGpmnWFH/IMG-7592.png',
      'https://i.ibb.co/WvZSrKyq/Miyu-Marinheira.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina'
  },
  {
    nome: 'Vestido Pink GG',
    tamanhos: ['GG'],
    descricao: 'Sua pet vai brilhar como uma verdadeira estrela com este vestido pink luxuoso!\nPerfeito para ocasiões especiais, festas, casamentos pet ou para aquele passeio onde sua melhor amiga merece estar deslumbrante e ser o centro das atenções.\n<strong>Detalhes que Encantam e Impressionam:</strong>\n- <i>Cor Pink Vibrante:</i> Um tom de pink intenso e apaixonante que realça a beleza de qualquer pet e transmite alegria e sofisticação.\n- <i>Renda Exclusiva:</i> A parte superior e os detalhes na saia são cuidadosamente trabalhados em renda no mesmo tom de pink, adicionando uma textura rica e um toque de delicadeza e luxo inigualáveis.\n- <i>Saia em Camadas Charmosa:</i> A saia é composta por camadas (babados) que dão volume, movimento e um caimento perfeito, criando um visual de festa que é pura elegância.\n- <i>Design Confortável:</i> Apesar de todo o glamour, o design do vestido (estilo frente única) foi pensado para ser confortável e fácil de vestir, garantindo que sua pet desfile com leveza e sem restrições.\nEste não é apenas um vestido, é uma declaração de estilo e carinho para sua companheira de quatro patas.\nSua pet merece este toque de glamour! Garanta já o Vestido Pink Luxo com Renda para ela.\n*Medidas:*\n- Pescoço: 40 a 52 cm.\n- Tórax: 46 a 60 cm.\n- Comprimento: 45 cm.',
    preco: 40,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/B2614dzx/IMG-7585.png',
      'https://i.ibb.co/h1K2bvC8/IMG-7586.png',
      'https://i.ibb.co/R8fTZP3/Miyu-Renda.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina'
  },
  {
    nome: 'Vestido Floral Lilás GG',
    tamanhos: ['GG'],
    descricao: 'Um toque de romance e frescor para a sua companheira!\nEste vestido combina a delicadeza das flores com a suavidade do lilás, criando um visual campestre encantador e muito elegante.\nIdeal para piqueniques, passeios ao ar livre e para quem ama um estilo shabby chic para sua pet!\n<strong>Destaques Florais e Delicados:</strong>\n- <i>Estampa Romântica:</i> O corpo do vestido é feito com um tecido de algodão de fundo branco e uma estampa miúda e delicada de florzinhas em tons de lilás e verde. Puro charme!\n- <i>Combinação de Tecidos:</i> A peça é harmonizada com tecidos lisos em lilás/roxo suave na parte superior (decote e alças) e nos babados intermediários da saia, criando um lindo contraste de texturas.\n- <i>Babados e Camadas:</i> A saia em camadas e babados (estilo "Maria Chiquinha") confere um movimento alegre e um caimento gracioso, perfeito para a pet que adora se movimentar.\n- <i>Laço de Açúcar:</i> Um grande laço branco em cetim na cintura adiciona o toque final de doçura, arrematando o look com elegância.\n- <i>Conforto Garantido:</i> O modelo frente única ou de alças é prático e foi pensado para garantir o bem-estar e a liberdade da sua pet durante todo o passeio.\nVista sua pet com a beleza dos campos floridos! Este vestido é puro carinho e estilo.\nAdicione este charme floral ao guarda-roupa da sua amiguinha!\n*Medidas:*\n- Pescoço: 52 cm.\n- Tórax: 66 cm.\n- Comprimento: 45 cm.',
    preco: 50,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/CSCdmsz/IMG-7587.png',
      'https://i.ibb.co/1tm3KGP9/IMG-7588.png',
      'https://i.ibb.co/hJ5NDXmT/RP-Glamour-Lilas-Miyu.png',
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina'
  },
  {
    nome: 'Vestido Floral Rosa e Vermelho GG',
    tamanhos: ['GG'],
    descricao: 'Sua pet vai desfilar com um visual cheio de energia e cor!\n Este vestido combina a doçura do floral pink com a intensidade do vermelho, criando um look vibrante e inesquecível.\nIdeal para pets que amam chamar a atenção e esbanjar alegria em todos os passeios!\n<strong>Combinação de Cores Marcante:</Strong>\n- <i>Estampa do Corpo:</i> O corpo e o babado superior são feitos em tecido de algodão com uma charmosa estampa de florzinhas em diversos tons de pink e vinho sobre um fundo rosa mais claro. Uma composição visual rica e feminina.\n- <i>Toque de Paixão:</i> O contraste fica por conta do babado inferior em tecido vermelho vivo, que adiciona profundidade, volume e uma dose extra de ousadia ao look.\n- <i>Modelo com Movimento:</i> A saia é confeccionada com babados em camadas, garantindo um caimento rodado e muito movimento a cada passo da sua pet.\n- <i>Conforto Descomplicado:</i> O design de alças/frente única garante que a peça seja prática de vestir e super confortável, permitindo que sua pet brinque e se divirta com liberdade.\nSe a sua pet é pura alegria e adora um look de impacto, este vestido é a escolha perfeita!\nLeve já o poder do pink e vermelho para o guarda-roupa da sua amiguinha!\n*Medidas:*\n- Pescoço: 46 a 62 cm.\n- Tórax: 64 a 72 cm.\n- Comprimento: 51 cm.',
    preco: 50,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/ccvhC3Pq/IMG-7595.png',
      'https://i.ibb.co/cStsXHJn/IMG-7596.png',
      'https://i.ibb.co/gFrr4Bx8/RP-Rosinha-Miyu.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina'
  },
  {
    nome: 'Vestido Natalino Rena Encantada GG',
    tamanhos: ['GG'],
    descricao: 'Sua pet pronta para brilhar na Noite Feliz! \nEste vestido é o look perfeito para celebrar o Natal com muito estilo, alegria e o espírito festivo.\nIdeal para fotos de família, ceia natalina e para quem quer deixar a pet com um visual temático inesquecível!\n<strong>Detalhes Festivos e Charmosos:</strong>\n - <i>Estampa Natalina Exclusiva:</i> O corpo do vestido é feito em tecido verde-escuro (tom pinho) e conta com uma estampa adorável de renas fofas, guirlandas, presentes e bengalas doces. Um verdadeiro charme natalino!\n- <i>Babados em Tom Neutro:</i> A saia em camadas (babados) utiliza um tom bege/creme suave, que proporciona um contraste elegante com o verde da estampa, remetendo ao aconchego das festas.\n- <i>Laços de Presente:</i> A cintura é decorada com laços de fita de cetim - um laço vermelho vibrante e um laço amarelo - que imitam os embrulhos de Natal, dando um toque final divertido e festivo.\n- <i>Conforto na Celebração:</i> O modelo de alças/frente única é prático de vestir e foi desenhado para garantir o máximo de conforto e liberdade para sua pet aproveitar as festividades.\nPrepare a câmera! Com este vestido, sua pet será a estrela mais fofa da sua decoração de Natal.\nGaranta este look natalino exclusivo para sua amiguinha!\n*Medidas:*\n- Pescoço: 52 a 60 cm.\n- Tórax: 58 a 70 cm.\n- Comprimento: 48 cm.',
    preco: 55,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/rfwd8hY3/IMG-7581.png',
      'https://i.ibb.co/LDJByrZH/IMG-7582.png',
      'https://i.ibb.co/PsNp1YLn/RP-Natal-Renas-Miyu.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina'
  },
  {
    nome: 'Vestido Natalino Flocos de Neve GG',
    tamanhos: ['GG'],
    descricao: 'Celebre a magia do Natal com muito brilho e sofisticação!\n Este vestido é a escolha perfeita para sua pet entrar no espírito natalino com um toque de elegância invernal.\nIdeal para fotos temáticas, confraternizações de fim de ano ou para quem busca um visual festivo e charmoso para sua amiguinha!\n<strong>Detalhes que Encantam:</strong>\n- <i>Estampa Festiva e Delicada:</i> O corpo e a parte superior da saia são confeccionados em tecido verde-esmeralda com uma delicada estampa de flocos de neve dourados, que evoca a beleza de um Natal branco e brilhante.\n- <i>Saia de Tule Brilhante:</i> A saia inferior é feita de tule verde-água com glitter ou brilho, adicionando um toque de magia, leveza e um suave cintilar que fará sua pet deslumbrar.\n- <i>Caimento em Camadas:</i> A saia em babados e camadas proporciona um movimento gracioso e um volume que remete aos vestidos de festa, garantindo um visual encantador.\n- <i>Conforto na Celebração:</i> O design de frente única é prático, fácil de vestir e projetado para oferecer o máximo de conforto, permitindo que sua pet celebre sem restrições.\nSua pet estará pronta para ser a estrela mais brilhante da sua celebração de Natal!\nGaranta este vestido mágico e elegante para as festas de fim de ano da sua companheira!\n*Medidas:*\n- Pescoço: 44 a 54 cm.\n- Tórax: 64 a 72 cm.\n- Comprimento: 54 cm.',
    preco: 45,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/7N1XrHGL/IMG-7583.png',
      'https://i.ibb.co/7JTs9QsH/IMG-7584.png',
      'https://i.ibb.co/JRkQ10T0/RP-Festa-Verde-Miyu.png'
    ],
    observacao:'Este modelo pode ser feito em outras estampas e tamanhos!\nPara ver as opções e fazer sua encomenda personalizada, basta nos chamar no <i>WhatsApp</i>!',
    isNovidade: false,
    tipo:'verao',
    genero:'menina'
  },
  {
    nome: 'Colete Natal P',
    tamanhos: ['P'],
    descricao: 'O Natal fica ainda mais mágico com a família completa, incluindo seu melhor amigo de quatro patas!\nApresentamos o nosso encantador Colete Natalino Premium para pets.\n<strong>Detalhes que encantam:</strong>\n- <i>Estilo Festivo:</i> O colete traz uma estampa exclusiva e divertida, com motivos natalinos fofos (dachsunds, árvores e luzes), sobre um fundo claro.\n- <i>Toque de Elegância:</i> O corte social e a gravata borboleta laranja vibrante  dão um charme irresistível, perfeito para as fotos de família e encontros de fim de ano.\n- <i>Conforto e Qualidade:</i> Confeccionado com tecidos leves e confortáveis, o colete garante que seu pet participe da festa com estilo, mas sem abrir mão do bem-estar. O tecido principal superior se harmoniza com a parte inferior em um vermelho natalino clássico e vibrante.\nAdquira agora e prepare-se para os elogios! O presente de Natal mais estiloso para o seu companheiro.\n*Medidas:*\n- Pescoço: 40 a 46 cm.\n- Tórax: 44 a 54 cm.\n- Comprimento: 39cm.',
    preco: 50,
    estoque: 1,
    imagens: [
      'https://i.ibb.co/JjtmtvJ6/Colete-Natal-Fte.png',
      'https://i.ibb.co/q3LmzS2r/COlete-Natal.png',
      'https://i.ibb.co/PsYbPTLZ/Colete-IA.png'
    ],
    tipo:'verao',
    genero:'menino'
  },
  {
    nome: 'Básica Moletinho P',
    tamanhos: ['P'],
    descricao: 'A peça ideal para o conforto e estilo do seu pet nos dias mais amenos!\nEsta linda blusa básica é confeccionada em Moletom Pluminha, um tecido de toque extra macio e aveludado, que proporciona um calor suave e o máximo de bem-estar para o seu companheiro.\nA estampa é um show de fofura, com vários guaxinins estilosos e pequenas florzinhas sobre um fundo claro e delicado.\nO acabamento é discreto e elegante, feito no próprio tecido, garantindo um caimento perfeito e muito conforto sem costuras que incomodem.\nGaranta já este abraço quentinho e cheio de personalidade para o seu pet!\n\n*Tecido:* Moletinho.\n*Cor:* Branco com desenhos de guaximin cinza e flores rosas.\n*Medidas:*\n- Pescoço: 38cm.\n- Tórax: 48cm.\n- Comprimento: 33cm.',
    preco: 30,
    estoque: 0,
    imagens: [
      'https://i.ibb.co/SwkK7ygQ/IMG-7038.png',
      'https://i.ibb.co/bgnCMfTc/IMG-6635.png',
      'https://i.ibb.co/5WHJL5cG/Moletinho-IA.png',
    ],
    observacao:'Atenção: Este modelo está ESGOTADO, mas não se preocupe, fazemos Sob Encomenda! Você pode solicitar o seu modelo em outras estampas e tecidos.\n<i>Entre em Contato</i> para ver as opções de estampas disponíveis e fazer seu pedido personalizado, chame-nos agora mesmo no<i> WhatsApp</i>!',
    tipo:'inverno',
    genero:'unissex'
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
  abas = ["Inverno ❄️", "Verão ☀️", "Capa de Chuva 🌧️", "Acessórios 🎀"];
  abaAtiva = 0;

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
}
