# Taller Reservas Web · Escuela Forma

Front en **Angular** para consultar y reservar talleres de una escuela de diseño ficticia. Consume la API REST del proyecto Laravel [taller-reservas](https://github.com/rosmery-gallardo/taller-reservas). El diseño está inspirado en la Bauhaus: formas geométricas, colores primarios y tipografía geométrica.

## Qué demuestra

- **Componentes standalone** y rutas con carga diferida (`loadComponent`).
- **Signals** para el estado de la vista (`signal`, `computed`, `input`) y paso de RxJS a signals con `toSignal` / `toObservable`.
- Servicio con **HttpClient** que envuelve la API y desempaqueta las respuestas de los API Resources de Laravel.
- **Formularios reactivos** con validación en el cliente y gestión de los errores `422` que devuelve la API (por ejemplo, taller completo).
- Paso de parámetros de ruta a componentes con `withComponentInputBinding()`.
- Fechas y precios en formato español (`LOCALE_ID`, `DatePipe`, `CurrencyPipe`).
- **Sass** con variables compartidas y estilos por componente.
- **Tests unitarios** del servicio con `HttpTestingController` (Vitest).

## Estructura

```
src/
├── app/
│   ├── core/
│   │   ├── api.config.ts          # URL base de la API (InjectionToken)
│   │   ├── workshop.model.ts      # Interfaces de la API
│   │   ├── workshop.service.ts    # Llamadas HTTP
│   │   └── workshop.service.spec.ts
│   ├── pages/
│   │   ├── workshop-list/         # Listado con filtro por disciplina
│   │   └── workshop-detail/       # Detalle y formulario de reserva
│   ├── app.config.ts
│   └── app.routes.ts
└── styles/_variables.scss         # Paleta Bauhaus
```

## Puesta en marcha

1. Arranca la API Laravel ([instrucciones](https://github.com/rosmery-gallardo/taller-reservas#puesta-en-marcha)). Debe quedar en `http://localhost:8000`.
2. En este proyecto:

```bash
npm install
npm start
```

Abre http://localhost:4200.

Si la API está en otra dirección, cambia la URL en `src/app/core/api.config.ts`.

## Tests

```bash
npm test
```

## Tecnologías

Angular 22 · TypeScript · RxJS · Signals · Reactive Forms · Sass · Vitest
