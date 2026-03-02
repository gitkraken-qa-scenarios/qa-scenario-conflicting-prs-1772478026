/**
 * API Gateway Configuration
 *
 * Central configuration for all runtime behaviour of the gateway.
 * Changing these values affects request handling, upstream timeouts,
 * and client-facing rate limits across all environments.
 */

'use strict';

module.exports = {
  // ─── Server ────────────────────────────────────────────────────────────────
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    keepAliveTimeout: 65_000,
  },

  // ─── Rate Limiting ─────────────────────────────────────────────────────────
  rateLimiting: {
    // Maximum number of requests allowed per window per client IP
    // Tightened from 100 → 50 to protect upstream services during peak hours
    maxRequestsPerWindow: 50,
    // Shortened window from 60 s → 30 s for more responsive throttle recovery
    windowMs: 30_000,
    // HTTP status code returned when the limit is exceeded
    statusCode: 429,
    // Whether to include rate-limit headers in every response
    includeHeaders: true,
  },

  // ─── Upstream API Timeouts ─────────────────────────────────────────────────
  upstreamTimeouts: {
    // Time to wait for a TCP connection to be established (ms)
    // Reduced from 3 s → 1.5 s — slow connects should fail fast
    connectTimeoutMs: 1_500,
    // Time to wait for the first byte of the response (ms)
    // Reduced from 10 s → 5 s to surface slow upstreams earlier
    readTimeoutMs: 5_000,
    // Maximum total request duration including retries (ms)
    // Reduced from 30 s → 15 s to keep p99 latency acceptable
    totalTimeoutMs: 15_000,
    // Reduced retries: 3 → 2 — fewer retries on already-slow upstreams
    maxRetries: 2,
  },

  // ─── Circuit Breaker ───────────────────────────────────────────────────────
  circuitBreaker: {
    enabled: true,
    // Number of consecutive failures before opening the circuit
    // Lowered from 5 → 3 to open the circuit more aggressively
    failureThreshold: 3,
    // Time the circuit stays open before attempting a probe request (ms)
    resetTimeoutMs: 15_000,
  },
};
