import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Footer,
    NgbModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('artesfocinhos');
}
