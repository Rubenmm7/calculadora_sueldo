# Números Claritos

Sitio web de finanzas personales y nóminas en España, centrado en herramientas prácticas para calcular sueldo neto, IRPF y crecimiento de inversiones. La web combina contenido editorial, calculadoras interactivas y guías explicativas en un diseño claro, minimalista y accesible.

## Descripción

Números Claritos es una web orientada a usuarios que quieren entender mejor:

- su salario bruto y neto
- la retención del IRPF
- la Seguridad Social en la nómina
- el interés compuesto y la evolución del ahorro
- conceptos fiscales y financieros explicados de forma cercana

La aplicación usa Next.js en App Router y está pensada para ser rápida, SEO-friendly y fácil de mantener.

## Stack principal

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- App Router de Next.js

## Funcionalidades principales

- Calculadora de sueldo neto e IRPF en España
- Calculadora de interés compuesto
- Blog con artículos educativos
- Páginas legales y de privacidad
- Contacto y soporte
- SEO básico con metadata y rutas estáticas

## Estructura del proyecto

```bash
.
├── public/
├── src/
│   ├── app/
│   │   ├── blog/
│   │   ├── contacto/
│   │   ├── interes-compuesto/
│   │   ├── privacidad/
│   │   ├── cookies/
│   │   ├── aviso-legal/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── ...
│   ├── components/
│   │   ├── Calculadora.tsx
│   │   ├── CalculadoraInteresCompuesto.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── data/
│       └── posts.ts
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
├── README.md
└── public/
```

## Requisitos

- Node.js 18 o superior
- npm

## Inicio rápido

1. Instala las dependencias:

```bash
npm install
```

2. Inicia el entorno de desarrollo:

```bash
npm run dev
```

3. Abre la app en tu navegador:

```text
http://localhost:3000
```

## Comandos útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar build compilada
npm run start

# Linting
npm run lint
```

## Despliegue

Este proyecto está preparado para desplegarse en plataformas como Vercel, que es la opción recomendada para aplicaciones Next.js.

### Recomendación de despliegue

```bash
npm run build
```

Y luego publicar la app en Vercel o en cualquier hosting compatible con Node.js/Next.js.

## Notas de desarrollo

- El contenido principal del blog está centralizado en `src/data/posts.ts`.
- Las páginas principales están bajo `src/app/` usando el sistema de rutas de Next.js App Router.
- Las calculadoras y widgets reutilizables viven en `src/components/`.
- El mantenimiento de estilos se hace con Tailwind CSS.

## Licencia

Este proyecto se usa para un sitio propio y no incluye una licencia pública definida por defecto.

Si quieres, puedo dejarte también una versión de README más “profesional” tipo portfolio o una versión más corta orientada a GitHub.
