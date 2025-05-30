# 📊 Calculadora de Story Points

Una aplicación web liviana, intuitiva y responsiva para que los colaboradores de TI puedan estimar Story Points de forma dinámica durante las sesiones de planificación ágil.

## ✨ Características

- **Cálculo automático**: Utiliza la fórmula `Tiempo × Complejidad × Definición`
- **Interfaz intuitiva**: Diseñada con Tailwind CSS y material design
- **Modo oscuro**: Toggle automático según preferencias del sistema
- **Responsive**: Optimizada para móviles y escritorio
- **Validación**: Verificación de campos antes del cálculo
- **Indicadores visuales**: Código de colores para niveles de complejidad (🟢🟡🔴)

## 🚀 Demo

La aplicación está disponible en: `http://localhost:5173/` (cuando se ejecuta localmente)

## 🛠️ Tecnologías

- **Frontend**: SvelteKit + TypeScript
- **Estilos**: Tailwind CSS 4.0
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint + Prettier

## 📋 Criterios de Estimación

### ⏱️ Tiempo Estimado

- `< 0.5 días` → 0.5
- `0.5 – 1 días` → 1
- `1 – 2 días` → 2
- `2 – 3 días` → 3
- `> 3 días` → 5

### 🧩 Complejidad

- **Baja** (🟢) → ×1.0
- **Media** (🟡) → ×1.5
- **Alta** (🔴) → ×2.0

### 📋 Definición

- **Clara** (🟢) → ×1.0
- **Ambigua** (🟡) → ×1.25
- **Incierta** (🔴) → ×1.5

## 💡 Ejemplo de Cálculo

```
Tiempo: 2 días → 2
Complejidad: Alta → ×2.0
Definición: Ambigua → ×1.25

Resultado: 2 × 2.0 × 1.25 = 5.0 Story Points
```

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd story-points-calculator

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173/
```

### Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:unit

# Verificar tipos de TypeScript
npm run check

# Verificar linting
npm run lint

# Formatear código
npm run format
```

### Producción

```bash
# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 🏗️ Estructura del Proyecto

```
src/
├── lib/
│   ├── components/
│   │   ├── DarkModeToggle.svelte    # Toggle de modo oscuro
│   │   ├── ResultDisplay.svelte     # Pantalla de resultados
│   │   └── SelectionCard.svelte     # Tarjetas de selección
│   ├── storyPointsCalculator.ts     # Lógica de cálculo
│   └── storyPointsCalculator.test.ts # Tests unitarios
├── routes/
│   ├── +layout.svelte               # Layout principal
│   └── +page.svelte                 # Página principal
├── app.css                          # Estilos globales
└── app.html                         # Template HTML
```

## 🧪 Testing

El proyecto incluye tests unitarios completos que verifican:

- ✅ Cálculo correcto de story points
- ✅ Validación de campos
- ✅ Redondeo a 0.5 más cercano
- ✅ Consistencia de datos
- ✅ Casos extremos

### Ejecutar tests específicos

```bash
# Solo tests del calculador
npm test -- storyPointsCalculator

# Tests con coverage
npm test -- --coverage
```

## 🔧 Configuración

### Tailwind CSS

El proyecto utiliza Tailwind CSS 4.0 con configuración automática. Los estilos se aplican mediante la directiva `@import 'tailwindcss'` en `src/app.css`.

### Modo Oscuro

El modo oscuro se activa automáticamente basándose en:

1. Preferencia guardada del usuario
2. Configuración del sistema operativo

## 📝 Scripts Disponibles

| Comando             | Descripción                      |
| ------------------- | -------------------------------- |
| `npm run dev`       | Inicia servidor de desarrollo    |
| `npm run build`     | Construye para producción        |
| `npm run preview`   | Previsualiza build de producción |
| `npm test`          | Ejecuta todos los tests          |
| `npm run test:unit` | Tests en modo watch              |
| `npm run check`     | Verificación de tipos TS         |
| `npm run lint`      | Verificación de linting          |
| `npm run format`    | Formateo de código               |

## 🚧 Roadmap

- [ ] Integración con API de Jira
- [ ] Persistencia de datos local
- [ ] Historial de cálculos
- [ ] Export a CSV/JSON
- [ ] Configuración personalizable de multiplicadores
- [ ] PWA support

## 🤝 Contribución

1. Fork el proyecto
2. Crea una branch para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Autores

- **Equipo de Desarrollo** - Calculadora de Story Points

## 🙏 Agradecimientos

- Inspirado en metodologías ágiles de desarrollo
- Diseñado para equipos de desarrollo de software
- Construido con las mejores prácticas de SvelteKit
