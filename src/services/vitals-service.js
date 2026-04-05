import http from "k6/http";
import { ENDPOINTS } from "../utils/endpoints.js";

const vitalsBaseUrl = `${ENDPOINTS.BASE_URL}${ENDPOINTS.VITALS}`;

export function createVitals(patientId, vitalsData) {
  const url = `${vitalsBaseUrl}/${patientId}`;
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return http.post(url, vitalsData, params);
}
