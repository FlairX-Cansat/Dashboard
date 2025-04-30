import { effect, Injectable, signal } from '@angular/core';
import { Theme } from '../interfaces/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  selectedTheme = signal<'light' | 'dark' | 'system'>(localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system');

  themes: Theme[] = [
    {
      name: 'light',
      displayName: 'Clair',
      iconName: 'light_mode',
    },
    {
      name: 'dark',
      displayName: 'Sombre',
      iconName: 'dark_mode'
    },
    {
      name: 'system',
      displayName: 'Automatique',
      iconName: 'colors',
    }
  ];

  setTheme(theme: Theme) {
    this.selectedTheme.set(theme.name);
  }

  constructor() {
    effect(() => {
      const newTheme = this.selectedTheme();
      newTheme == 'system' ? document.documentElement.style.colorScheme = 'light dark' : document.documentElement.style.colorScheme = newTheme;
      localStorage.setItem('theme', newTheme);
    });
  }
}
