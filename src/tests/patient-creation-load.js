import { check, sleep } from "k6";
import { Counter } from 'k6/metrics';
import { generatePatientData } from "../../data/patient-data.js";
import { VITALS_DATA } from "../../data/vitals-data.js";
import { createPatient } from "../services/patient-service.js";
import { createVitals } from "../services/vitals-service.js";
import { loadConfig } from "../config/load-config.js";

export const options = loadConfig;
export let error4xx = new Counter('http_4xx_responses');
export let error5xx = new Counter('http_5xx_responses');
export let success2xx = new Counter('http_2xx_responses');

export default function () {
  const patientPayload = JSON.stringify(generatePatientData());
  const createPatientResponse = createPatient(patientPayload);

  if (createPatientResponse.status >= 200 && createPatientResponse.status < 300) {
        success2xx.add(1);
  } else if (createPatientResponse.status >= 400 && createPatientResponse.status < 500) {
        error4xx.add(1);
  } else if (createPatientResponse.status >= 500) {
        error5xx.add(1);
  }

  check(createPatientResponse, {
    "POST /pacients - Status 201": (r) => r.status === 201,
  });

  if (createPatientResponse.status === 201) {
    const patientId = JSON.parse(createPatientResponse.body).id;

    const vitalsPayload = JSON.stringify(VITALS_DATA);
    const createVitalsResponse = createVitals(patientId, vitalsPayload);

    if (createVitalsResponse.status >= 200 && createVitalsResponse.status < 300) {
        success2xx.add(1);
    } else if (createVitalsResponse.status >= 400 && createVitalsResponse.status < 500) {
          error4xx.add(1);
    } else if (createVitalsResponse.status >= 500) {
          error5xx.add(1);
    }

    check(createVitalsResponse, {
      "POST /vitals/{pacientId} - Status 201": (r) => r.status === 201,
    });
  }

  sleep(1);
}
