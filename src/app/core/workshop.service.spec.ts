import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_URL } from './api.config';
import { Workshop } from './workshop.model';
import { WorkshopService } from './workshop.service';

const workshop: Workshop = {
  id: 1,
  slug: 'tipografia-geometrica',
  title: 'Tipografía geométrica',
  description: 'Alfabeto con retícula modular.',
  discipline: { value: 'tipografia', label: 'Tipografía', color: 'black' },
  instructor: 'Jordi Ferrer',
  starts_at: '2026-12-01T18:30:00+00:00',
  duration_minutes: 180,
  capacity: 10,
  seats_left: 10,
  price_cents: 4500,
};

describe('WorkshopService', () => {
  let service: WorkshopService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: 'http://api.test/api' },
      ],
    });
    service = TestBed.inject(WorkshopService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('lists workshops and unwraps the "data" envelope', () => {
    let result: Workshop[] = [];
    service.list().subscribe((list) => (result = list));

    http.expectOne('http://api.test/api/workshops').flush({ data: [workshop] });

    expect(result).toEqual([workshop]);
  });

  it('sends the discipline filter as a query param', () => {
    service.list('tipografia').subscribe();

    const req = http.expectOne((r) => r.url === 'http://api.test/api/workshops');
    expect(req.request.params.get('discipline')).toBe('tipografia');
    req.flush({ data: [] });
  });

  it('posts a booking', () => {
    service.book('tipografia-geometrica', { name: 'Ana', email: 'ana@example.com', seats: 2 }).subscribe();

    const req = http.expectOne('http://api.test/api/workshops/tipografia-geometrica/bookings');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.seats).toBe(2);
    req.flush({ data: { id: 1, workshop: 'tipografia-geometrica', name: 'Ana', seats: 2, created_at: '' } });
  });
});
