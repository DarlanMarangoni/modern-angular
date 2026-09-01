import { Injectable, effect, signal } from '@angular/core';

const STORAGE_KEY = 'theme-preference';
const DARK_CLASS = 'app-dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  readonly isDark = signal<boolean>(this.getInitialPreference());

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle(DARK_CLASS, this.isDark());
      localStorage.setItem(STORAGE_KEY, this.isDark() ? 'dark' : 'light');
    });
  }

  toggle(): void {
    this.isDark.update(value => !value);
  }

  private getInitialPreference(): boolean {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return stored === 'dark';
    }
    if (typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
