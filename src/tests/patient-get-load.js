import { check, sleep } from "k6";
import { Counter } from 'k6/metrics';
import { VITALS_DATA } from "../../data/vitals-data.js";
import { createPatient, getPatientById } from "../services/patient-service.js";
import { createVitals } from "../services/vitals-service.js";
import { loadConfig } from "../config/load-config.js";

export const options = loadConfig;
export let error4xx = new Counter('http_4xx_responses');
export let error5xx = new Counter('http_5xx_responses');
export let success2xx = new Counter('http_2xx_responses');

export function setup() {
  const patientIds = [];
  const setupBaseId = String(Math.floor(Math.random() * 90000) + 10000);

  for (let i = 0; i < 5; i++) {
    const identificacion = `${setupBaseId}${String(i).padStart(5, "0")}`;
    const patientData = {
      identificacion: identificacion,
      nombres: `SetupNombre${i}`,
      apellidos: `SetupApellido${i}`,
      fecha_de_nacimiento: "1990-05-15",
      genero: "masculino",
      estado: "En espera",
    };

    const createPatientResponse = createPatient(JSON.stringify(patientData));

    if (createPatientResponse.status === 201) {
      patientIds.push(identificacion);

      createVitals(identificacion, JSON.stringify(VITALS_DATA));
    }
  }

  return { patientIds };
}

export default function (data) {
  const patientId =
    data.patientIds[Math.floor(Math.random() * data.patientIds.length)];
  const response = getPatientById(patientId);

  if (response.status >= 200 && response.status < 300) {
        success2xx.add(1);
  } else if (response.status >= 400 && response.status < 500) {
        error4xx.add(1);
  } else if (response.status >= 500) {
        error5xx.add(1);
  }

  check(response, {
    "GET /pacients/{pacientId} - Status 200": (r) => r.status === 200,
  });

  sleep(1);
}
