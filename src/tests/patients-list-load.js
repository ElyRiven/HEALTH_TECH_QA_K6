import { check, sleep } from "k6";
import { Counter } from 'k6/metrics';
import { getAllPatients } from "../services/patient-service.js";
import { loadConfig } from "../config/load-config.js";

export const options = loadConfig;
export let error4xx = new Counter('http_4xx_responses');
export let error5xx = new Counter('http_5xx_responses');
export let success2xx = new Counter('http_2xx_responses');

export default function () {
  const response = getAllPatients();
  
  if (response.status >= 200 && response.status < 300) {
        success2xx.add(1);
  } else if (response.status >= 400 && response.status < 500) {
        error4xx.add(1);
  } else if (response.status >= 500) {
        error5xx.add(1);
  }

  check(response, {
    "GET /pacients - Status 200": (r) => r.status === 200,
  });

  sleep(1);
}
