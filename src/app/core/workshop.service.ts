import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from './api.config';
import { ApiResponse, Booking, BookingRequest, Workshop } from './workshop.model';

@Injectable({ providedIn: 'root' })
export class WorkshopService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_URL);

  list(discipline?: string | null): Observable<Workshop[]> {
    const params = discipline ? new HttpParams().set('discipline', discipline) : undefined;

    return this.http
      .get<ApiResponse<Workshop[]>>(`${this.baseUrl}/workshops`, { params })
      .pipe(map((res) => res.data));
  }

  get(slug: string): Observable<Workshop> {
    return this.http
      .get<ApiResponse<Workshop>>(`${this.baseUrl}/workshops/${slug}`)
      .pipe(map((res) => res.data));
  }

  book(slug: string, booking: BookingRequest): Observable<Booking> {
    return this.http
      .post<ApiResponse<Booking>>(`${this.baseUrl}/workshops/${slug}/bookings`, booking)
      .pipe(map((res) => res.data));
  }
}
