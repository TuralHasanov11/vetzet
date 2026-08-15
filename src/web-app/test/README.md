# Test Scaffold

This project uses Nuxt Test Utils and Vitest projects split by test intent.

## Structure

- test/unit: Fast unit tests in Node environment.
- test/nuxt: Nuxt runtime tests (composables, components with Nuxt context).
- test/e2e: End-to-end style tests using Nuxt test utilities.

## Commands

- npm run test:all
- npm run test:unit
- npm run test:nuxt
- npm run test:e2e
- npm run test:coverage
- npm run test:watch

## Coverage

Coverage is configured in vitest.config.ts with text, html, and cobertura reporters.
Thresholds are intentionally set to 0 in the initial scaffold so coverage can run in new projects.
Raise thresholds gradually as tests are added.
