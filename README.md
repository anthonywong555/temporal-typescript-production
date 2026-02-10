# temporal-typescript-production

This document meant to show you the roadmap on how to "productionize" your Temporal Worker for TS. 

## Metrics, Tracing, and Logs
- [OpenTelemetry](https://github.com/temporalio/samples-typescript/tree/main/interceptors-opentelemetry)
  - [package.json](https://github.com/temporalio/samples-typescript/blob/main/interceptors-opentelemetry/package.json)
  - [instrumentation.ts](https://github.com/temporalio/samples-typescript/blob/main/interceptors-opentelemetry/src/instrumentation.ts)
  - [worker.ts - otelSdk.shutdown();](https://github.com/temporalio/samples-typescript/blob/main/interceptors-opentelemetry/src/worker.ts#L93)
 
## Health Check

- [healthService.check](https://github.com/temporalio/sdk-typescript/blob/main/packages/test/src/test-client-connection.ts#L224C32-L224C50)
  - [withOptionalStatusServer](https://github.com/temporalio/sdk-typescript/blob/42b16641ef2ad4afd81afd45de15cb9a2c10aff2/packages/test/src/load/worker.ts#L173)
 
## Sentry

- [OpenTelemetry](https://github.com/getsentry/sentry-javascript/tree/develop/packages/opentelemetry)
  - [SvelteKit](https://github.com/getsentry/sentry-javascript/tree/develop/packages/sveltekit)
