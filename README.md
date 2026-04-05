# HealthTech QA K6 — Pruebas de Rendimiento

## Descripción

Proyecto de automatización de pruebas de carga para la API REST del sistema HealthTech. Evalúa el rendimiento de los endpoints de gestión de pacientes y registro de constantes vitales bajo condiciones de carga sostenida, aplicando el Protocolo Manchester para la clasificación clínica de los datos enviados. Los scripts cubren la creación de pacientes con sus signos vitales, la consulta individual de un paciente y la consulta del listado general de pacientes.

---

## Stack Tecnológico

| Tecnología    | Versión | Propósito                                   |
| ------------- | ------- | ------------------------------------------- |
| Node.js       | v24     | Sistema de construcción y gestor de scripts |
| K6            | v1.6.1  | Framework de pruebas de rendimiento         |
| xk6-dashboard | v0.8.1  | Plugin de reportería HTML estático          |

---

## Estructura del Proyecto

```
HEALTH_TECH_QA_K6/
├── data/                         # Generadores y constantes de datos para los endpoints
│   ├── patient-data.js           # Función generadora de datos de pacientes (IDs dinámicos)
│   └── vitals-data.js            # Constantes de signos vitales (Protocolo Manchester, Nivel 4-5)
├── results/                      # Reportes HTML generados tras cada ejecución
│   ├── patient-creation-report.html
│   ├── patient-get-report.html
│   └── patients-list-report.html
├── src/
│   ├── config/
│   │   └── load-config.js        # Configuración de carga: stages, VUs y umbrales
│   ├── services/
│   │   ├── patient-service.js    # Llamadas HTTP a los endpoints de /pacients
│   │   └── vitals-service.js     # Llamada HTTP al endpoint de /vitals/{pacientId}
│   ├── tests/
│   │   ├── patient-creation-load.js   # POST /pacients + POST /vitals/{id}
│   │   ├── patient-get-load.js        # GET /pacients/{pacientId}
│   │   └── patients-list-load.js      # GET /pacients
│   └── utils/
│       └── endpoints.js          # URL base y rutas de los endpoints
├── API_DOCUMENTATION.md
├── MANCHESTER_PROTOCOL.md
└── package.json
```

---

## Ejecución del Proyecto

### Prerequisitos

#### 1. Instalar K6 con el plugin xk6-dashboard

El proyecto requiere K6 compilado con la extensión `xk6-dashboard` para generar los reportes HTML. Sigue los pasos de instalación oficial:

```bash
# Instalar xk6 (herramienta de build de K6)
go install go.k6.io/xk6/cmd/xk6@latest

# Compilar K6 con el plugin xk6-dashboard v0.8.1
xk6 build v1.6.1 --with github.com/grafana/xk6-dashboard@v0.8.1
```

Mueve el binario resultante a una ruta accesible en tu `$PATH` o úsalo desde la ruta local.

> Consulta la documentación oficial en: https://github.com/grafana/xk6-dashboard

#### 2. Asegúrate de que la API esté levantada

Los tests apuntan a `http://localhost:3000/api/v1`. Verifica que el servidor esté corriendo antes de ejecutar cualquier prueba.

---

### Comandos de Ejecución

Instala las dependencias del proyecto (opcional, solo para validar el `package.json`):

```bash
npm install
```

Ejecuta cada prueba de forma individual con los siguientes comandos:

| Script npm                        | Prueba                                                |
| --------------------------------- | ----------------------------------------------------- |
| `npm run test:load:createPatient` | Load test — POST /pacients + POST /vitals/{pacientId} |
| `npm run test:load:getPatient`    | Load test — GET /pacients/{pacientId}                 |
| `npm run test:load:getPatients`   | Load test — GET /pacients                             |

**Ejemplo:**

```bash
npm run test:load:createPatient
```

---

### Configuración de Carga

Todos los scripts comparten la misma configuración definida en `src/config/load-config.js`:

| Parámetro    | Valor        | Descripción                                  |
| ------------ | ------------ | -------------------------------------------- |
| VUs máximos  | 30           | Garantiza un mínimo de ~25 TPS con sleep(1s) |
| Rampa subida | 20s → 30 VUs | Incremento gradual de carga                  |
| Carga plena  | 40s @ 30 VUs | Carga sostenida                              |
| Rampa bajada | 20s → 0 VUs  | Reducción gradual hasta detener la carga     |

**Umbrales evaluados:**

| Métrica             | Umbral         | Descripción                               |
| ------------------- | -------------- | ----------------------------------------- |
| `http_req_duration` | `p(95)<2000ms` | El percentil 95 de duración debe ser < 2s |
| `http_req_failed`   | `rate<0.02`    | La tasa de error debe ser inferior al 2%  |

---

### Reportes

Cada ejecución genera un reporte HTML estático en el directorio `results/`:

| Reporte                                | Script que lo genera      |
| -------------------------------------- | ------------------------- |
| `results/patient-creation-report.html` | `test:load:createPatient` |
| `results/patient-get-report.html`      | `test:load:getPatient`    |
| `results/patients-list-report.html`    | `test:load:getPatients`   |

Abre cualquier archivo `.html` en un navegador para visualizar las métricas de rendimiento, gráficas de TPS, latencia y distribución de tiempos de respuesta generadas por el plugin `xk6-dashboard`.
