# Taller Reservas Web · Escuela Forma

**[Ver la demo en vivo](https://rosmery-gallardo.github.io/taller-reservas-web/)**

Front en **Angular** para consultar y reservar talleres de una escuela de diseño ficticia. Consume la API REST del proyecto Laravel [taller-reservas](https://github.com/rosmery-gallardo/taller-reservas). El diseño está inspirado en la Bauhaus: formas geométricas, colores primarios y tipografía geométrica.

## Qué demuestra

- **Componentes standalone** y rutas con carga diferida (`loadComponent`).
- **Signals** para el estado de la vista (`signal`, `computed`, `input`) y paso de RxJS a signals con `toSignal` / `toObservable`.
- Servicio con **HttpClient** que envuelve la API y desempaqueta las respuestas de los API Resources de Laravel.
- **Formularios reactivos** con validación en el cliente y gestión de los errores `422` que devuelve la API (por ejemplo, taller completo).
- Paso de parámetros de ruta a componentes con `withComponentInputBinding()`.
- Fechas y precios en formato español (`LOCALE_ID`, `DatePipe`, `CurrencyPipe`).
- **Sass** con variables compartidas y estilos por componente.
- **Modo demo** para GitHub Pages: un `DemoWorkshopService` con la misma interfaz que el servicio real y datos en memoria. Se cambia por inyección de dependencias, sin tocar los componentes.
- **Tests unitarios** de los servicios con `HttpTestingController` (Vitest).
- **Despliegue continuo** con GitHub Actions: cada push a `main` pasa los tests y publica la demo.

## Estructura

```
src/
├── app/
│   ├── core/
│   │   ├── api.config.ts          # URL base de la API (InjectionToken)
│   │   ├── workshop.model.ts      # Interfaces de la API
│   │   ├── workshop.service.ts    # Llamadas HTTP
│   │   ├── demo-workshop.service.ts # Datos de ejemplo para la demo
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

Para probar el front sin la API, abre http://localhost:4200/?demo y usará los datos de ejemplo.

## Tests

```bash
npm test
```

## Tecnologías

Angular 22 · TypeScript · RxJS · Signals · Reactive Forms · Sass · Vitest
