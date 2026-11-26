# Results: login load test

Run of 2025-12-17 against `https://fakestoreapi.com/auth/login`.

| Metric | Target | Result | Status |
| --- | --- | --- | --- |
| Duration | 25 min | 25 min | – |
| Throughput | 20 req/s | ≈ 19.99 req/s (30,000 requests) | Met |
| `http_req_duration` p95 | < 1500 ms | 337.87 ms | Met |
| `http_req_failed` | < 3% | 14.72% | **Not met** |
| Check `status is 200` | 100% | 0 of 30,000 | **Not met** |
| Check `response time <= 1500ms` | 100% | 30,000 of 30,000 | Met |

## Reading the results

The service answers quickly and the test held the target load, so latency under 20 req/s is not a concern. Functionally, no request returned 200, which means the run measured how fast the API rejects or answers differently, not successful logins. Possible causes:

- The demo credentials in `data/credentials.csv` are not accepted by the endpoint.
- The endpoint answers a successful login with a different 2xx code, so the strict `status === 200` check fails.
- The payload or headers differ from what the API expects.

## Next steps

1. Confirm one successful login manually with `curl` and note the exact status code.
2. Adjust the success check to the real code and keep the credentials that work.
3. Record the distribution of HTTP codes (the script now counts them by status) and rerun.
4. Rerun the full 25 minutes and replace this file with the new numbers.
