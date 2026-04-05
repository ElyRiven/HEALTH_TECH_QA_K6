import { check, sleep } from "k6";
import { getAllPatients } from "../services/patient-service.js";
import { loadConfig } from "../config/load-config.js";

export const options = loadConfig;

export default function () {
  const response = getAllPatients();

  check(response, {
    "GET /pacients - Status 200": (r) => r.status === 200,
  });

  sleep(1);
}
