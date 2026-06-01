import { Component } from '@angular/core';
import { PersonagensComponent } from './features/personagens/personagens.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonagensComponent],
  templateUrl: './app.html'
})
export class App {}
