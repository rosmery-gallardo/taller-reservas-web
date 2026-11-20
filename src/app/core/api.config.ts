import { InjectionToken } from '@angular/core';

/** URL base de la API Laravel (proyecto taller-reservas). */
export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8000/api',
});

/**
 * Modo demo: datos de ejemplo en memoria en lugar de la API.
 * Se activa solo en GitHub Pages (no hay servidor PHP) o añadiendo ?demo a la URL.
 */
export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.endsWith('github.io') || new URLSearchParams(window.location.search).has('demo');
}
