import http from "k6/http";
import { ENDPOINTS } from "../utils/endpoints.js";

const patientsUrl = `${ENDPOINTS.BASE_URL}${ENDPOINTS.PATIENTS}`;

export function createPatient(patientData) {
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return http.post(patientsUrl, patientData, params);
}

export function getPatientById(patientId) {
  return http.get(`${patientsUrl}/${patientId}`);
}

export function getAllPatients() {
  return http.get(patientsUrl);
}
