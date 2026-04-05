export const loadConfig = {
  stages: [
    { duration: "20s", target: 45 },
    { duration: "40s", target: 45 },
    { duration: "20s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.02"],
    http_req_duration: ["p(95)<2000"],
  },
};
