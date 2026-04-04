## Instrucciones para GitHub Copilot y agentes de IA

### Stack Tecnológico

- **JavaScript**
- **Node.js v24**
- **K6 v1.6.1 + Dashboard Plugin v0.8.1** disponible en el [siguiente repositorio](https://github.com/grafana/xk6-dashboard)

### Contexto del Proyecto

- Proyecto de Automatización de pruebas de rendimiento con K6.
- El proyecto utiliza Node.js como sistema de construcción.
- Framework principal: K6.
- Los scripts de prueba se reconocen y ejecutan usando archivos `.js`.

### Buenas Prácticas de Desarrollo

- Mantener el código limpio, modular y reutilizable.
- Escribir métodos y clases con una única responsabilidad.
- Evitar la duplicidad de código; reutilizar componentes y utilidades.
- Escribir pruebas independientes y repetibles.
- Validar los resultados esperados usando aserciones claras.
- Mantener la estructura de carpetas organizada según lo especificado en este documento.

### Importaciones

- **No** se deben realizar importaciones directamente dentro del cuerpo del código (métodos, clases, etc.).
- Todas las importaciones deben declararse al inicio de cada archivo JavaScript.
- Usar las importaciones dentro del código únicamente después de haberlas declarado al inicio.
- **SIEMPRE** añadir la extensión .js en las importaciones al importar métodos, constantes u otras utilidades de archivos externos.

### Lineamientos de Nomenclatura y Sintaxis

- Todas las variables, archivos y métodos deben nombrarse en **inglés**.
- Los archivos .js deben seguir la nomenclatura Kebab Case, ejemplo: `user-config.js`.
- Los reportes html deben usar Kebab Case al ser generados, ejemplo: `get-report.html`.
- Usa los ejemplos del documento `.github/instructions/k6-sintax.instructions.md` para definir la implementación de los scripts.
- Los archivos dentro del directorio `/tests` deben ser identificados por el tipo de prueba en su nombre, ejemplo: `user-creation-smoke.js`, `user-get-load.js`.
- Los archivos de documentación como el README.md son la única excepción de idioma, los cuales deben estar redactados en español.

### Otros Lineamientos

- Seguir las convenciones de K6 para la estructura de los scripts.
- Seguir **siempre** esta estructura de directorios:

NOMBRE_DEL_PROYECTO/
└── data/ # Directorio para definir objetos que representen los datos a usar en los scripts.
│ └── post-data.js  
└── results/ # Directorio que almacena los reportes HTML que se generan mediante el plugin añadido a K6.
│ └── get-report.html
└── src/ # Directorios para agrupar las pruebas
│ └── config/ # Directorio para definir los objetos de configuración de K6 (vus, duración de la prueba, iteraciones, umbrales a evaluar, etc).
│ │     └── user-config.js
│ └── services/ # Directorio que contiene las funciones que implementan las llamadas a las APIs en prueba.
│ │     └── user-service.js
│ └── tests/ # Directorio que contiene los scripts propios de K6 para la ejecución de las pruebas de rendimiento.
│ │     └── user-creation-smoke.js
│ │     └── user-get-load.js
│ └── utils/ # Directorio que contiene archivos utilitarios del proyecto (Base URL, endpoints, constantes, etc)
│       └── endpoints.js
└── package.json # Archivo de definición de datos del proyecto, dependencias externas y scripts para la ejecución de pruebas.

- Priorizar la legibilidad y mantenibilidad del código.
