# Reglas de formato para K6

Este documento define ejemplos de la sintaxis a usar en los diferentes archivos dentro de los directorios del proyecto de K6.

## `data/`

Archivos para definir la estructura de datos que se usarán en las llamadas a los endpoints de los scripts de automatización.

```javascript
export const PET_DATA = {
  id: 101010,
  category: {
    id: 7,
    name: "perritos",
  },
  name: "Akia",
  photoUrls: ["string"],
  tags: [
    {
      id: 3,
      name: "pequines",
    },
  ],
  status: "available",
};
```

## `src/`

### `config/`

Archivos que define los objetos de configuración que recibe el script de prueba de K6.

```javascript
export const smokeConfig = {
  vus: 15,
  duration: "5m",
  iterations: 450,
  thresholds: {
    http_req_failed: ["rate<0.01"],
  },
};

export const loadConfig = {
  stages: [
    { duration: "5s", target: 10 },
    { duration: "20s", target: 10 },
    { duration: "5s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    // http_req_duration: ["p(95)<200"],
    http_req_duration: [{ threshold: "p(95)<1", abortOnFail: false }],
  },
};
```

### `services/`

Archivos para definir las funciones que realizan las llamadas a las APIs que se van a probar, definiendo la URL destino, los datos y parámetros.

```javascript
import http from "k6/http";
import { ENDPOINT } from "../utils/endpoints.js";

const url = `${ENDPOINT.BASE_URL}${ENDPOINT.PET_ENDPOINT}`;

export function newPet(petData) {
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return http.post(url, petData, params);
}

export function getPet(petId) {
  const getUrl = `${url}/${petId}`;

  return http.get(getUrl);
}
```

### `tests/`

Archivos en los que se definen los scripts de prueba de K6, que reciben las opciones de ejecución, la función principal que ejecuta el script y checks a comprobar de los resultados de la ejecución.

```javascript
import { check, sleep } from "k6";
import { PET_DATA } from "../../data/post_data.js";
import { newPet } from "../services/pet-service.js";
import { smokeConfig } from "../config/pets-config.js";

export const options = smokeConfig;

export default function () {
  const payload = JSON.stringify(PET_DATA);

  const res = newPet(payload);

  const body = JSON.parse(res.body);

  check(res, {
    "Response code === 200": (r) => r.status === 200,
    "Response body contains sent name": (r) => body.name === "Akia",
    "Response body contains sent id": (r) => body.id === 101010,
  });

  sleep(1);
}
```

### `utils/`

Archivos utilitarios que definen constantes y funciones de apoyo a usar en el proyecto.

```javascript
export const ENDPOINT = {
  BASE_URL: "https://petstore.swagger.io/v2",
  PET_ENDPOINT: "/pet",
};
```

## `package.json`

Archivo para administrar la información del proyecto, las dependencias externas y los scripts de ejecución de las pruebas.

```json
{
  "name": "k6_template",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "test:smoke:newPet": "k6 run --out \"dashboard=export=results/post-report.html\" src/tests/pet-creation-smoke.js",
    "test:load:getPet": "k6 run --out \"dashboard=export=results/get-report.html\" src/tests/pet-get-load.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
```
