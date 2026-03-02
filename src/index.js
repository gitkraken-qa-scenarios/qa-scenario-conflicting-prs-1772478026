'use strict';

const config = require('./config');

console.log(`Starting API Gateway on ${config.server.host}:${config.server.port}`);
console.log(`Rate limit: ${config.rateLimiting.maxRequestsPerWindow} req / ${config.rateLimiting.windowMs}ms`);
console.log(`Upstream connect timeout: ${config.upstreamTimeouts.connectTimeoutMs}ms`);
