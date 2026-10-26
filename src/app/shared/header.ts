import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreService } from '../core/store.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  readonly menuOpen = signal(false);

  constructor(readonly store: StoreService) {}

  toggleMenu(): void {
    this.menuOpen.update(isOpen => !isOpen);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
