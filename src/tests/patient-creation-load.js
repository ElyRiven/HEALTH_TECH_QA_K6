import { check, sleep } from "k6";
import { generatePatientData } from "../../data/patient-data.js";
import { VITALS_DATA } from "../../data/vitals-data.js";
import { createPatient } from "../services/patient-service.js";
import { createVitals } from "../services/vitals-service.js";
import { loadConfig } from "../config/load-config.js";

export const options = loadConfig;

export default function () {
  const patientPayload = JSON.stringify(generatePatientData());
  const createPatientResponse = createPatient(patientPayload);

  check(createPatientResponse, {
    "POST /pacients - Status 201": (r) => r.status === 201,
  });

  if (createPatientResponse.status === 201) {
    const patientId = JSON.parse(createPatientResponse.body).id;

    const vitalsPayload = JSON.stringify(VITALS_DATA);
    const createVitalsResponse = createVitals(patientId, vitalsPayload);

    check(createVitalsResponse, {
      "POST /vitals/{pacientId} - Status 201": (r) => r.status === 201,
    });
  }

  sleep(1);
}
