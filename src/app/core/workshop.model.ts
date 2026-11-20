export type DisciplineColor = 'red' | 'blue' | 'yellow' | 'black';

export interface Discipline {
  value: string;
  label: string;
  color: DisciplineColor;
}

export interface Workshop {
  id: number;
  slug: string;
  title: string;
  description: string;
  discipline: Discipline;
  instructor: string;
  starts_at: string;
  duration_minutes: number;
  capacity: number;
  seats_left: number;
  price_cents: number;
}

export interface BookingRequest {
  name: string;
  email: string;
  seats: number;
}

export interface Booking {
  id: number;
  workshop: string;
  name: string;
  seats: number;
  created_at: string;
}

/** Las respuestas de los API Resources de Laravel van envueltas en "data". */
export interface ApiResponse<T> {
  data: T;
}

export const DISCIPLINES: ReadonlyArray<Omit<Discipline, 'color'>> = [
  { value: 'diseno', label: 'Diseño' },
  { value: 'tipografia', label: 'Tipografía' },
  { value: 'ceramica', label: 'Cerámica' },
  { value: 'fotografia', label: 'Fotografía' },
  { value: 'arquitectura', label: 'Arquitectura' },
];
