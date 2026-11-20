import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { DISCIPLINES, Workshop } from '../../core/workshop.model';
import { WorkshopService } from '../../core/workshop.service';

type ListState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; workshops: Workshop[] };

@Component({
  selector: 'app-workshop-list',
  imports: [RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './workshop-list.html',
  styleUrl: './workshop-list.scss',
})
export class WorkshopList {
  private readonly service = inject(WorkshopService);

  protected readonly disciplines = DISCIPLINES;
  protected readonly discipline = signal<string | null>(null);

  // Cada vez que cambia el filtro se vuelve a pedir la lista a la API.
  protected readonly state = toSignal(
    toObservable(this.discipline).pipe(
      switchMap((discipline) =>
        this.service.list(discipline).pipe(
          map((workshops): ListState => ({ status: 'ready', workshops })),
          catchError(() => of<ListState>({ status: 'error' })),
          startWith<ListState>({ status: 'loading' }),
        ),
      ),
    ),
    { initialValue: { status: 'loading' } as ListState },
  );

  protected readonly workshops = computed(() => {
    const state = this.state();
    return state.status === 'ready' ? state.workshops : [];
  });

  protected select(discipline: string | null): void {
    this.discipline.set(discipline);
  }
}
