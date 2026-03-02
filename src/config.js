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
    maxRequestsPerWindow: 100,
    // Duration of the sliding window in milliseconds
    windowMs: 60_000,
    // HTTP status code returned when the limit is exceeded
    statusCode: 429,
    // Whether to include rate-limit headers in every response
    includeHeaders: true,
  },

  // ─── Upstream API Timeouts ─────────────────────────────────────────────────
  upstreamTimeouts: {
    // Time to wait for a TCP connection to be established (ms)
    connectTimeoutMs: 3_000,
    // Time to wait for the first byte of the response (ms)
    readTimeoutMs: 10_000,
    // Maximum total request duration including retries (ms)
    totalTimeoutMs: 30_000,
    // Number of times to retry a failed upstream request
    maxRetries: 3,
  },

  // ─── Circuit Breaker ───────────────────────────────────────────────────────
  circuitBreaker: {
    enabled: true,
    // Number of consecutive failures before opening the circuit
    failureThreshold: 5,
    // Time the circuit stays open before attempting a probe request (ms)
    resetTimeoutMs: 15_000,
  },
};
