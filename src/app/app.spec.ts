import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the school name in the header', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const header = (fixture.nativeElement as HTMLElement).querySelector('.logo');
    expect(header?.textContent).toContain('Escuela Forma');
  });
});
