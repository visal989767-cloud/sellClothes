import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer';
import { HeaderComponent } from './shared/header';

@Component({
  selector: 'tc-root',
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
