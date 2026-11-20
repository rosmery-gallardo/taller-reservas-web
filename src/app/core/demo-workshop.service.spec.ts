import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DemoWorkshopService } from './demo-workshop.service';

describe('DemoWorkshopService', () => {
  let service: DemoWorkshopService;

  beforeEach(() => (service = new DemoWorkshopService()));

  it('filters workshops by discipline', async () => {
    const list = await firstValueFrom(service.list('tipografia'));
    expect(list.length).toBe(1);
    expect(list[0].discipline.value).toBe('tipografia');
  });

  it('subtracts the booked seats', async () => {
    await firstValueFrom(service.book('tipografia-geometrica-con-reticula', { name: 'Ana', email: 'a@b.es', seats: 3 }));
    const w = await firstValueFrom(service.get('tipografia-geometrica-con-reticula'));
    expect(w.seats_left).toBe(7);
  });

  it('rejects a booking over capacity with a 422, like the API', async () => {
    await expect(
      firstValueFrom(service.book('cartel-constructivista', { name: 'Ana', email: 'a@b.es', seats: 4 })),
    ).rejects.toSatisfy((e: HttpErrorResponse) => e.status === 422 && e.error.message.includes('2 plazas'));
  });
});
