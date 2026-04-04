# Caso de Prueba a automatizar

## Contexto

Necesito que implementes la automatización de pruebas de carga de la API de mi proyecto, ubicada en la URL `http://localhost:3000/api/v1`. Los endpoints disponibles en mi API son `/pacients` (GET y POST), `/pacients/{pacientId}` (GET) , `/vitals/{pacientId}` (POST). Revisa la documentación de la API en el documento `API_DOCUMENTATION.md`.

- **URL Base:** http://localhost:3000/api/v1
- **Contenido aceptado:** application/json

## Endpoints a Evaluar

La automatización debe evaluar los siguientes endpoints:

### Creación de pacientes (POST)

- Creación de un nuevo paciente en el sistema mediante el endpoint `/pacients` (POST)
  **URL:** /pacients
  Revisa la documentación de este endpoint para definir la estructura de datos que recibe y definir los datos a enviar.

### Creación de constantes vitales de pacientes (POST)

- Creación de un nuevo registro de constantes vitales asociado a un paciente (POST)
  **URL:** /vitals/{pacientId}
  Revisa la documentación de este endpoint para definir la estructura de datos que recibe y definir los datos a enviar según el documento `MANCHESTER_PROTOCOL.md`.

### Consulta de paciente registrado en el sistema (GET)

- Consulta de un paciente mediante su ID (GET)
  **URL:** /pacients/{pacientId}
  Revisa la documentación del endpoint para que implementes correctamente su prueba.

### Consulta de listado de pacientes registrados en el sistema (GET)

- Consulta del listado de todos los pacientes registrados en el sistema y con registro de constantes vitales (GET)
  **URL:** /pacients
  Revisa la documentación del endpoint para que implementes correctamente la automatización.

## Tareas

Debes generar un script de automatización por cada endpoint para automatizar pruebas únicamente de carga con las siguientes configuraciones:

- Load Test
  Garantiza un mínimo de TPS de 25/s. Define los VUs a usar para garantizar esta cantidad de TPS.
  Crea una subida inicial de VUs en 20s, mantén la carga de VUs durante 40s y elimina completamente la carga en los últimos 20s.

- Implementa la generación de datos dinámicos para los endpoints y evitar colisiones de IDs.
- Registra las constantes vitales de los pacientes en el mismo script en el que se crean los pacientes y de esta forma no generar registros huerfanos y facilitar el acceso al ID del paciente registrado.

- Verifica que el status de todas las peticiones a los endpoints devuelvan un estado 200 o 201 según sea el comportamiento de la API.

## Métricas y Umbrales

- El percentil 95 de todos los endpoints en la métrica `http_req_duration` debe ser inferior a 2s.
- La tasa de error de todos los endpoints en la métrica `http_req_failed` debe ser inferior al 2%.

## Objetivo

Debes crear la automatización de pruebas de rendimiento de los endpoints especificados, generando los archivos necesarios en sus correspondientes directorios y los scripts de ejecución.
Actualiza los scripts del archivo `package.json` para poder ejecutar cada prueba individualmente y que genere reportes individuales por cada endpoint y por cada tipo de prueba.
Finalmente debes asegurar que el proyecto permita la ejecución correcta de las pruebas y la generación del reporte HTML de la extensión de reportería xk6 con los resultados de rendimiento y sus metricas correspondientes.
