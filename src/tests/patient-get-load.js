import { check, sleep } from "k6";
import { VITALS_DATA } from "../../data/vitals-data.js";
import { createPatient, getPatientById } from "../services/patient-service.js";
import { createVitals } from "../services/vitals-service.js";
import { loadConfig } from "../config/load-config.js";

export const options = loadConfig;

export function setup() {
  const patientIds = [];
  const setupBaseId = Math.floor(Math.random() * 90000) + 5000;

  for (let i = 0; i < 5; i++) {
    const patientData = {
      identificacion: setupBaseId + i,
      nombres: `SetupNombre${i}`,
      apellidos: `SetupApellido${i}`,
      fecha_de_nacimiento: "1990-05-15",
      genero: "masculino",
      estado: "En espera",
    };

    const createPatientResponse = createPatient(JSON.stringify(patientData));

    if (createPatientResponse.status === 201) {
      const body = JSON.parse(createPatientResponse.body);
      const patientId = body.id;

      patientIds.push(patientId);

      createVitals(patientId, JSON.stringify(VITALS_DATA));
    }
  }

  return { patientIds };
}

export default function (data) {
  const patientId =
    data.patientIds[Math.floor(Math.random() * data.patientIds.length)];
  const response = getPatientById(patientId);

  check(response, {
    "GET /pacients/{pacientId} - Status 200": (r) => r.status === 200,
  });

  sleep(1);
}
