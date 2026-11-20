import { InjectionToken } from '@angular/core';

/** URL base de la API Laravel (proyecto taller-reservas). */
export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8000/api',
});
