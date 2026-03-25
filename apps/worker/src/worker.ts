import { DefaultLogger, Worker, Runtime, makeTelemetryFilterString } from '@temporalio/worker';
import { OpenTelemetryPlugin } from '@temporalio/interceptors-opentelemetry';
import * as activities from './activities';
import { setupOtelSdk, resource, spanProcessor } from './instrumentation';

function initializeRuntime() {
  Runtime.install({
    logger: new DefaultLogger('WARN'),
    telemetryOptions: {
      logging: {
        forward: {},
        filter: makeTelemetryFilterString({ core: 'INFO', other: 'INFO' }),
      },
    },
  });
}

async function main() {
  const otelSdk = setupOtelSdk();
  initializeRuntime();

  const plugins = spanProcessor ? [new OpenTelemetryPlugin({ resource, spanProcessor })] : [];

  const workflowOption = () =>
  process.env.NODE_ENV === 'production'
    ? {
        workflowBundle: {
          codePath: require.resolve('../workflow-bundle.js'),
        },
        plugins
      }
    : { workflowsPath: require.resolve('./workflows'), plugins };

  const worker = await Worker.create({
    ...workflowOption(),
    activities,
    taskQueue: 'production-sample',
  });
  try {
    await worker.run();
  } finally {
    await otelSdk.shutdown();
  }
}

main().then(
  () => void process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);