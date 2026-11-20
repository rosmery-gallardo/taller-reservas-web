import { Workshop } from './workshop.model';

/** Fecha futura relativa a hoy, para que la demo siempre tenga talleres próximos. */
function inDays(days: number, hour = 18, minute = 30): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

/** Mismos talleres que el seeder del proyecto Laravel (database/seeders/DatabaseSeeder.php). */
export function demoWorkshops(): Workshop[] {
  return [
    {
      id: 1,
      slug: 'color-y-forma-el-circulo-el-cuadrado-y-el-triangulo',
      title: 'Color y forma: el círculo, el cuadrado y el triángulo',
      description:
        'Exploramos la relación entre forma y color de los ejercicios del curso preliminar de la Bauhaus y diseñamos una composición propia.',
      discipline: { value: 'diseno', label: 'Diseño', color: 'red' },
      instructor: 'Marta Puig',
      starts_at: inDays(7),
      duration_minutes: 120,
      capacity: 12,
      seats_left: 5,
      price_cents: 3500,
    },
    {
      id: 2,
      slug: 'tipografia-geometrica-con-reticula',
      title: 'Tipografía geométrica con retícula',
      description: 'Construimos un alfabeto con regla, compás y una retícula modular, y lo llevamos a un cartel.',
      discipline: { value: 'tipografia', label: 'Tipografía', color: 'black' },
      instructor: 'Jordi Ferrer',
      starts_at: inDays(10),
      duration_minutes: 180,
      capacity: 10,
      seats_left: 10,
      price_cents: 4500,
    },
    {
      id: 3,
      slug: 'ceramica-funcional-piezas-para-el-dia-a-dia',
      title: 'Cerámica funcional: piezas para el día a día',
      description:
        'Modelado de piezas sencillas y útiles, sin ornamento, siguiendo el principio de que la forma sigue a la función.',
      discipline: { value: 'ceramica', label: 'Cerámica', color: 'yellow' },
      instructor: 'Laia Soler',
      starts_at: inDays(14),
      duration_minutes: 180,
      capacity: 8,
      seats_left: 0,
      price_cents: 4500,
    },
    {
      id: 4,
      slug: 'fotografia-de-la-nueva-vision',
      title: 'Fotografía de la Nueva Visión',
      description:
        'Picados, contrapicados y sombras duras: fotografiamos la ciudad como lo hacían Moholy-Nagy y sus alumnos.',
      discipline: { value: 'fotografia', label: 'Fotografía', color: 'blue' },
      instructor: 'Pau Roig',
      starts_at: inDays(18),
      duration_minutes: 120,
      capacity: 12,
      seats_left: 9,
      price_cents: 3500,
    },
    {
      id: 5,
      slug: 'arquitectura-y-espacio-minimo',
      title: 'Arquitectura y espacio mínimo',
      description:
        'Analizamos viviendas mínimas y diseñamos en maqueta un espacio de 25 m² funcional y luminoso.',
      discipline: { value: 'arquitectura', label: 'Arquitectura', color: 'red' },
      instructor: 'Núria Vidal',
      starts_at: inDays(25, 18, 0),
      duration_minutes: 90,
      capacity: 15,
      seats_left: 15,
      price_cents: 2500,
    },
    {
      id: 6,
      slug: 'cartel-constructivista',
      title: 'Cartel constructivista',
      description: 'Diagonales, bloques de color y tipografía en negrita para diseñar un cartel con mensaje.',
      discipline: { value: 'diseno', label: 'Diseño', color: 'red' },
      instructor: 'Marta Puig',
      starts_at: inDays(32),
      duration_minutes: 120,
      capacity: 12,
      seats_left: 2,
      price_cents: 3500,
    },
  ];
}
