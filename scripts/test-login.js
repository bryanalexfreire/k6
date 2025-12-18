import { check, sleep } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

const creds = new SharedArray('creds', function () {
  const raw = open('../data/credentials.csv');
  const lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l !== '');
  const start = lines[0] && lines[0].toLowerCase().includes('user') && lines[0].toLowerCase().includes('password') ? 1 : 0;
  return lines.slice(start).map((l) => {
    const parts = l.split(',');
    return { user: parts[0].trim(), password: parts[1] ? parts[1].trim() : '' };
  }).filter(c => c.user && c.password);
});

export const options = {
  scenarios: {
    login_test: {
      executor: 'constant-arrival-rate',
      rate: 20, // 20 iterations per second == 20 TPS
      timeUnit: '1s',
      duration: __ENV.DURATION || '25m',
      preAllocatedVUs: 50,
      maxVUs: 200,
    },
  },
  thresholds: {
    'http_req_duration': ['p(95)<1500'], // p95 < 1500 ms
    'http_req_failed': ['rate<0.03'], // < 3% failed requests
  },
};

export default function () {
  const c = creds[Math.floor(Math.random() * creds.length)];
  const url = 'https://fakestoreapi.com/auth/login';
  const payload = JSON.stringify({ username: c.user, password: c.password });
  const params = { headers: { 'Content-Type': 'application/json' } };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time <= 1500ms': (r) => r.timings.duration <= 1500,
  });

  sleep(0.05);
}
