import { proxyActivities, log } from '@temporalio/workflow';
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function example(name: string): Promise<string> {
  log.error('Log:Error');
  console.error('Console Log:Error');
  const result = await greet(name);

  log.info(`Log.info: ${result}`);
  console.info(`Console.info: ${result}`);
  return result;
}
