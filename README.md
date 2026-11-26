# k6 login load test

Constant-arrival-rate load test for a login endpoint, written with [k6](https://k6.io). It reads credentials from a CSV file, holds a fixed throughput and fails the run when latency or error-rate thresholds are broken.

The target is the public demo API `https://fakestoreapi.com/auth/login`, so it can be run by anyone without setup.

## What it demonstrates

- `constant-arrival-rate` executor holding **20 requests per second** for 25 minutes (`DURATION` is configurable).
- Data-driven requests with `SharedArray` and a CSV file (`data/credentials.csv`).
- Thresholds as pass/fail criteria: `http_req_duration` p95 < 1500 ms and `http_req_failed` < 3%.
- Separate checks for status and response time, plus a per-status counter to see the real distribution of HTTP codes.

## Project structure

```
scripts/test-login.js   k6 script
data/credentials.csv    demo users (public test data of the demo API)
RESULTS.md              findings of the recorded run
docs/terminal-run.png   console summary of that run
```

## Run it

```bash
k6 run scripts/test-login.js --summary-export=summary.json
# shorter run
k6 run -e DURATION=2m scripts/test-login.js
```

Requires k6 v0.45 or later.

## Results

The recorded run (25 minutes, ~30,000 requests) reached the target rate (≈20 req/s) with p95 latency of 338 ms, well under the 1500 ms threshold. The error-rate threshold was not met, and no response returned status 200. See [RESULTS.md](RESULTS.md) for the analysis and next steps.
