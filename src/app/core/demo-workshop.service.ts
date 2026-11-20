import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { demoWorkshops } from './demo-data';
import { Booking, BookingRequest, Workshop } from './workshop.model';

const LATENCY_MS = 300;

/**
 * Misma interfaz que WorkshopService, pero con datos en memoria.
 * Se usa en GitHub Pages, donde no hay API Laravel: así la demo se puede probar entera.
 * Reproduce las mismas reglas que la API (aforo, 404, error 422).
 */
@Injectable()
export class DemoWorkshopService {
  private workshops = demoWorkshops();
  private nextBookingId = 1;

  list(discipline?: string | null): Observable<Workshop[]> {
    const result = discipline ? this.workshops.filter((w) => w.discipline.value === discipline) : this.workshops;
    return of(result.map((w) => ({ ...w }))).pipe(delay(LATENCY_MS));
  }

  get(slug: string): Observable<Workshop> {
    const workshop = this.workshops.find((w) => w.slug === slug);
    return workshop
      ? of({ ...workshop }).pipe(delay(LATENCY_MS))
      : throwError(() => new HttpErrorResponse({ status: 404 }));
  }

  book(slug: string, booking: BookingRequest): Observable<Booking> {
    const workshop = this.workshops.find((w) => w.slug === slug);
    if (!workshop) {
      return throwError(() => new HttpErrorResponse({ status: 404 }));
    }

    if (booking.seats > workshop.seats_left) {
      const message =
        workshop.seats_left === 0
          ? 'El taller está completo.'
          : `Solo quedan ${workshop.seats_left} plazas disponibles.`;
      return throwError(() => new HttpErrorResponse({ status: 422, error: { message } })).pipe(delay(LATENCY_MS));
    }

    workshop.seats_left -= booking.seats;

    return of({
      id: this.nextBookingId++,
      workshop: slug,
      name: booking.name,
      seats: booking.seats,
      created_at: new Date().toISOString(),
    }).pipe(delay(LATENCY_MS));
  }
}
