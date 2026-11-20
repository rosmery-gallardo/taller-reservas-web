import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Workshop } from '../../core/workshop.model';
import { WorkshopService } from '../../core/workshop.service';

@Component({
  selector: 'app-workshop-detail',
  imports: [ReactiveFormsModule, RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './workshop-detail.html',
  styleUrl: './workshop-detail.scss',
})
export class WorkshopDetail implements OnInit {
  private readonly service = inject(WorkshopService);
  private readonly fb = inject(FormBuilder);

  /** Viene del parámetro de ruta :slug gracias a withComponentInputBinding(). */
  readonly slug = input.required<string>();

  protected readonly workshop = signal<Workshop | null>(null);
  protected readonly notFound = signal(false);
  protected readonly sending = signal(false);
  protected readonly success = signal<string | null>(null);
  protected readonly serverError = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    seats: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
  });

  ngOnInit(): void {
    this.load();
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.serverError.set(null);

    this.service.book(this.slug(), this.form.getRawValue()).subscribe({
      next: (booking) => {
        this.success.set(`¡Reserva confirmada para ${booking.seats} persona(s)! Te esperamos en el taller.`);
        this.form.reset({ name: '', email: '', seats: 1 });
        this.sending.set(false);
        this.load();
      },
      error: (err: HttpErrorResponse) => {
        // La API devuelve 422 con el mensaje de validación o de aforo completo.
        this.serverError.set(err.error?.message ?? 'No se ha podido completar la reserva.');
        this.sending.set(false);
      },
    });
  }

  protected hasError(control: 'name' | 'email' | 'seats'): boolean {
    const c = this.form.controls[control];
    return c.invalid && c.touched;
  }

  private load(): void {
    this.service.get(this.slug()).subscribe({
      next: (w) => this.workshop.set(w),
      error: () => this.notFound.set(true),
    });
  }
}
