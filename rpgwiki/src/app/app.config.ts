import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';

const RpgPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: '{orange.500}',
      600: '{orange.600}',
      700: '{orange.700}',
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}'
    },
    colorScheme: {
      dark: {
        surface: {
          0: '#0a0a0c',
          50: '#141418',
          100: '#1c1c22',
          200: '#2a2a32',
          300: '#3f3f46',
          400: '#52525b',
          500: '#71717a',
          600: '#a1a1aa',
          700: '#d4d4d8',
          800: '#e4e4e7',
          900: '#f4f4f5',
          950: '#fafafa'
        }
      }
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: RpgPreset,
        options: {
          darkModeSelector: '.dark-mode'
        }
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes)
  ]
};
