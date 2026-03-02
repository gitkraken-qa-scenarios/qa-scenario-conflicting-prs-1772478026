# API Gateway

An internal API gateway service that handles rate limiting, upstream routing, and circuit breaking.

## Configuration

All runtime settings live in `src/config.js`. Key sections:

- **rateLimiting** — Controls how many requests each client IP can make per time window.
- **upstreamTimeouts** — Controls how long the gateway waits for upstream services to respond.
- **circuitBreaker** — Controls automatic failure isolation for degraded upstream services.

## Getting Started

```bash
npm start
```
