import { Component, HostListener } from '@angular/core';
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
 tecidos = [
  {
    nome: "Soft",
    imagem: "https://i.ibb.co/gM5HSMqG/S07.jpg",
    descricao: "Leve, macio e aconchegante, o soft é ideal para dias fresquinhos. Proporciona conforto sem pesar, sendo ótimo para o uso diário ou passeios em climas amenos.",
    mostrarDescricao: false
  },
  {
    nome: "Fleece",
    imagem: "https://i.ibb.co/YTcCmtVp/F20.jpg",
    descricao: "Mais encorpado que o soft, o fleece é excelente para os dias frios. Tem toque macio e mantém o calor por mais tempo, protegendo seu pet com muito conforto no inverno.",
    mostrarDescricao: false
  },
  {
    nome: "Microsoft",
    imagem: "https://i.ibb.co/tpCSg4jr/M05.jpg",
    descricao: "Com textura aveludada e toque super macio, o microsoft é quentinho e flexível, oferecendo liberdade de movimento. Uma ótima escolha para os dias mais gelados. Ideal para revestimento.",
    mostrarDescricao: false
  },
  {
    nome: "Pele Carapinha",
    imagem: "https://i.ibb.co/7xbJ3L7V/C01.jpg",
    descricao: "Extremamente fofa e com aparência de lã de carneiro, a pele carapinha é perfeita para o frio. Muito quentinha e estilosa, traz um charme especial e um nível extra de conforto para o seu pet. Ideal para revestimento.",
    mostrarDescricao: false
  },
  {
    nome: "Moletom/Moletinho",
    imagem: "https://i.ibb.co/C3tCbXCD/Moletinho.jpg",
    descricao: "Leve e confortável, ideal para meia-estação. Tem um visual moderno e despojado.",
    mostrarDescricao: false
  },
  {
    nome: "Jeans",
    imagem: "https://i.ibb.co/N2757R4F/Jeans.jpg",
    descricao: "Para quem gosta de estilo com personalidade. Ótimo para looks urbanos e casuais.",
    mostrarDescricao: false
  },
  {
    nome: "Matelassê",
    imagem: "https://i.ibb.co/S4fHr3nJ/MT02.jpg",
    descricao: "Tecido acolchoado e resistente, firme e confortável. Perfeito para capas.",
    mostrarDescricao: false
  },
  {
    nome: "Tricoline",
    imagem: "https://i.ibb.co/M5jLFFcF/tricoline.png",
    descricao: "Tecido leve e fresquinho, macio e estruturado. Ideal para bandanas e roupas de verão.",
    mostrarDescricao: false
  },
  {
    nome: "Ribanas",
    imagem: "https://i.ibb.co/gb0TnBGX/Azul-Royal.jpg",
    descricao: "Malha canelada de alta elasticidade, essencial para o ajuste perfeito de punhos, barras e golas. Garante que a roupa permaneça no lugar, oferece maior durabilidade e confere um caimento clássico/esportivo, como o de um moletom.",
    mostrarDescricao: false
  }
];

abrirDetalhes(tecido: any) {
  console.log("clicou no card", tecido);
  // se quiser abrir modal no futuro, já tá pronto
}

toggleDescricao(tecido: any, event: Event) {
  event.stopPropagation(); // evita conflito com abrirDetalhes
  tecido.mostrarDescricao = !tecido.mostrarDescricao;
}

  infoAberta: number | null = null;

toggleInfo(index: number) {
  this.infoAberta = this.infoAberta === index ? null : index;
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
